import * as Yup from "yup";

import { Form, Formik } from "formik";

import { SearchField } from "./fields";
import { SubmitButton } from "components/buttons";
import { useRouter } from "next/router";

interface Values {
  query: string;
}

const querySchema = Yup.object().shape({
  query: Yup.string(),
});

export default function SearchForm() {
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
      {({ isSubmitting }) => (
        <Form>
          <div className="inline-flex items-center gap-2">
            <div className="max-w-xs">
              <SearchField
                name="query"
                type="text"
                placeholder="Search for anything"
              />
            </div>
            <span className="">
              <SubmitButton text="Go" disabled={isSubmitting} />
            </span>
          </div>
        </Form>
      )}
    </Formik>
  );
}
