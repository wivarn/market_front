import * as Yup from "yup";

import { Form, Formik, FormikHelpers } from "formik";

import { TextField } from "./fields";
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
    <div>
      <h1 className="font-bold">
        Find the next centerpiece for your collection
      </h1>
      <Formik
        initialValues={{
          query: "",
        }}
        validationSchema={querySchema}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          router.push({
            pathname: "/listings/search",
            query: { query: values.query },
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <TextField
              name="search"
              type="text"
              placeholder="Search feature pending "
              disabled={true}
            />

            <button type="submit" disabled={isSubmitting}>
              Go!
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
