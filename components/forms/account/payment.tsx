import * as Yup from "yup";

import { DropdownCombobox } from "../fields";
import { Form, Formik } from "formik";
import useSWR, { mutate } from "swr";

import FormContainer from "../container";
import { ProfileApi } from "services/backendApi/profile";
import { SpinnerLg } from "components/spinner";
import { SubmitButtonFull } from "components/buttons";
import { toast } from "react-toastify";
import { useSession } from "next-auth/client";
import { SmInfoCircle } from "components/icons";
import { ToolTipBelow } from "components/tooltip";

const currencyList = [
  { value: "CAD", text: "CAD" },
  { value: "USD", text: "USD" },
];

const paymentSchema = Yup.object().shape({
  currency: Yup.mixed()
    .oneOf(
      currencyList.map((currency) => {
        return currency.value;
      }),
      "invalid currency"
    )
    .required("Currency is required"),
});

const currencyLabel = () => {
  return (
    <div className="flex space-x-2">
      <span className="font-semibold">Listing Currency</span>
      <span className="relative flex flex-col items-center group text-primary">
        <SmInfoCircle />
        <ToolTipBelow
          text={`Your listing currency doesn't need to match your country.
          Updating your currnecy will not update your existing listings.
          Doesn't affect your search results`}
        />
      </span>
    </div>
  );
};

export default function PaymentForm(): JSX.Element {
  const [session, loading] = useSession();

  function getProfile() {
    const { data, error } = useSWR(
      session ? ["account/profile", session.accessToken] : null
    );

    return {
      profile: data,
      isLoading: !error && !data,
      isError: error,
    };
  }

  const { profile, isLoading, isError } = getProfile();

  if (isLoading || loading) return <SpinnerLg text="Loading..." />;
  if (isError) return <div>Error</div>;

  return (
    <FormContainer>
      <Formik
        initialValues={{
          currency: profile.data.currency,
        }}
        validationSchema={paymentSchema}
        onSubmit={(values, actions) => {
          ProfileApi(session?.accessToken)
            .update(values)
            .then(() => {
              toast.success("Your listing currency has been updated");
              mutate(["account/profile", session?.accessToken]);
            })
            .finally(() => {
              actions.setSubmitting(false);
            });
        }}
      >
        {(formik) => (
          <Form>
            <div className="my-2 space-y-2">
              <DropdownCombobox
                label={currencyLabel()}
                name="currency"
                items={currencyList}
              />

              <SubmitButtonFull
                text="Update Currency"
                disabled={formik.isSubmitting}
              />
            </div>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
}
