import * as Yup from "yup";

import { Form, Formik } from "formik";

import { SearchField } from "../fields";
import { useRouter } from "next/router";

interface Values {
  title: string;
}

const querySchema = Yup.object().shape({
  title: Yup.string().required(),
});

export default function SearchForm(): JSX.Element {
  const router = useRouter();

  if (!router.isReady) return <div>Spinner</div>;

  const title = `${router.query.title}`;

  return (
    <Formik
      initialValues={{ title: title }}
      validationSchema={querySchema}
      onSubmit={(values: Values, actions) => {
        router.push({
          pathname: "/listings/search",
          query: { title: values.title },
        });
        actions.setSubmitting(false);
      }}
    >
      {() => (
        <Form>
          <div className="inline-flex items-center gap-1">
            <div className="max-w-xs">
              <SearchField
                name="title"
                type="text"
                placeholder="Search for anything"
                hideError={true}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
