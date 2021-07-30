import * as Yup from "yup";

import { Form, Formik } from "formik";
import { GenericErrorMessage, InfoMessage } from "components/message";
import useSWR, { mutate } from "swr";

import { DropdownCombobox } from "../fields";
import FormContainer from "../container";
import Link from "next/link";
import { ProfileApi } from "services/backendApi/profile";
import { SpinnerLg } from "components/spinner";
import { SubmitButtonFull } from "components/buttons";
import { toast } from "react-toastify";
import { useSession } from "next-auth/client";

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
  if (isError) return <GenericErrorMessage></GenericErrorMessage>;

  return (
    <FormContainer>
      <Formik
        initialValues={{
          currency: profile.data.currency,
        }}
        validationSchema={paymentSchema}
        onSubmit={(values, actions) => {
          const formData = new FormData();
          formData.append("currency", values.currency);
          ProfileApi(session?.accessToken)
            .update(formData)
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
              <InfoMessage>
                <span>
                  Listing currency will set the currency for new listings. If
                  you change it current listings will not be affected.{" "}
                  <Link href="#">
                    <a className="underline text-info">Learn more.</a>
                  </Link>
                </span>
              </InfoMessage>
              <DropdownCombobox
                label="Listing Currency"
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
