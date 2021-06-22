import * as Yup from "yup";

import { Form, Formik } from "formik";

import { SearchField } from "../fields";
import { useRouter } from "next/router";
import { AddressApi } from "services/backendApi/address";
import { useSession } from "next-auth/client";

interface Values {
  title: string;
}

const querySchema = Yup.object().shape({
  title: Yup.string().required(),
});

export default function SearchForm(): JSX.Element {
  const router = useRouter();
  const [session] = useSession();

  let title = "";
  if (router.pathname == "/listings/search") {
    const params = new URLSearchParams(router.asPath.split("?")[1]);
    title = params.has("title") ? `${params.get("title")}` : "";
  }

  return (
    <Formik
      initialValues={{ title: title }}
      validationSchema={querySchema}
      onSubmit={(values: Values, actions) => {
        if (session) {
          AddressApi(session?.accessToken)
            .get()
            .then((response) => {
              const country = response.data.length
                ? response.data[0].country
                : "USA";
              router.push({
                pathname: "/listings/search",
                query: { title: values.title, shipping_country: country },
              });
              actions.setSubmitting(false);
            });
        } else {
          router.push({
            pathname: "/listings/search",
            query: { title: values.title, shipping_country: "USA" },
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
