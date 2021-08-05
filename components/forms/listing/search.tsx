import * as Yup from "yup";

import { Form, Formik } from "formik";

import { AddressApi } from "services/backendApi/address";
import { SearchField } from "../fields";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

interface Values {
  query: string;
}

const querySchema = Yup.object().shape({
  query: Yup.string().required(),
});

export default function SearchForm(): JSX.Element {
  const router = useRouter();
  const [session] = useSession();

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
        if (session) {
          AddressApi(session?.accessToken)
            .get()
            .then((response) => {
              const country = response.data ? response.data.country : "USA";
              router.push({
                pathname: "/listings/search",
                query: { query: values.query, shipping_country: country },
              });
              actions.setSubmitting(false);
            });
        } else {
          router.push({
            pathname: "/listings/search",
            query: { query: values.query, shipping_country: "USA" },
          });
          actions.setSubmitting(false);
        }
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
