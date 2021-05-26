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
    <div className="mt-8 mx-4 border-2 bg-blue-50 border-blue-800 rounded-md">
      <h2 className="mt-2 px-2">Find the next centerpiece for your collection</h2>
      <div className="p-2 grid grid-col-2">
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
                className="px-2 py-1 border-2 border-gray-400 rounded-md"
                placeholder="Search for anything"
                disabled={true}
              />

              <button
                type="submit"
                className="rounded bg-blue-800 text-white hover:bg-blue-50 hover:text-blue-800 border-2 border-blue-800 px-2 py-1 font-semibold"
                disabled={isSubmitting}
              >
                Search
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
