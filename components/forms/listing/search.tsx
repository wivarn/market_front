import * as Yup from "yup";

import { Form, Formik } from "formik";

import { SearchField } from "../fields";
import { UserSettingsContext } from "contexts/userSettings";
import { useContext } from "react";
import { useRouter } from "next/router";

interface Values {
  query: string;
}

const querySchema = Yup.object().shape({
  query: Yup.string().required(),
});

export default function SearchForm(): JSX.Element {
  const router = useRouter();
  const { userSettings } = useContext(UserSettingsContext);

  let query = "";
  if (router.pathname == "/listings/search") {
    const params = new URLSearchParams(router.asPath.split("?")[1]);
    query = params.has("query") ? `${params.get("query")}` : "";
  }

  return (
    <Formik
      initialValues={{ query: query }}
      validationSchema={querySchema}
      onSubmit={(values: Values, actions) => {
        router.push({
          pathname: "/listings/search",
          query: {
            query: values.query,
            destination_country: userSettings.country,
          },
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
                hideError={true}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
