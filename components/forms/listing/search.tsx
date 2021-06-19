import * as Yup from "yup";

import { Form, Formik } from "formik";

import { SearchField } from "../fields";
import { useRouter } from "next/router";

interface Values {
  query: string;
}

const querySchema = Yup.object().shape({
  query: Yup.string(),
});

export default function SearchForm(): JSX.Element {
  const router = useRouter();
  return (
    <Formik
      initialValues={{
        query: "",
      }}
      validationSchema={querySchema}
      onSubmit={(values: Values, actions) => {
        router.push({
          pathname: "/listings/search",
          query: { title: values.query },
        });
        actions.setSubmitting(false);
      }}
    >
      {() => (
        <Form>
          <div className="inline-flex items-center gap-1">
            <div className="max-w-xs">
              <SearchField
                name="query"
                type="text"
                placeholder="Search for anything"
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
