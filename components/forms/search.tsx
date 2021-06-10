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
          <div className="grid items-center grid-cols-5 gap-4">
            <div className="col-span-4">
              <TextField
                name="search"
                type="text"
                placeholder="Search for anything"
                disabled={true}
              />
            </div>
            <span className="">
              <SubmitButton text="Search" disabled={isSubmitting} />
            </span>
          </div>
        </Form>
      )}
    </Formik>
  );
}
