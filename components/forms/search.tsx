import * as Yup from "yup";

import { Form, Formik, FormikHelpers } from "formik";

import { SubmitButton } from "components/buttons";
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
    <div className="mt-8 mx-4 border-2 bg-gray-50 rounded-md">
      <h2 className="mt-2 px-2">
        Find the next centerpiece for your collection
      </h2>
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
                placeholder="Search for anything"
                disabled={true}
              />
              <SubmitButton text="Search" disabled={isSubmitting} />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
