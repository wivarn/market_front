import * as Yup from "yup";

import { DropdownCombobox } from "../fields";
import { Form, Formik } from "formik";
import useSWR, { mutate } from "swr";
import Link from "next/link";
import FormContainer from "../container";
import { ProfileApi } from "services/backendApi/profile";
import InfoMessage from "components/message";
import { SpinnerLg } from "components/spinner";
import { SubmitButtonFull } from "components/buttons";
import { toast } from "react-toastify";
import { useSession } from "next-auth/client";
import { SmInfoCircle } from "components/icons";
import { ToolTipAbove } from "components/tooltip";

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
    <div className="flex items-center space-x-2">
      <span className="font-semibold">Listing Currency</span>
      <span className="relative group">
        <SmInfoCircle />
        <ToolTipAbove text={`This sets the currency of new listings.`} />
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
              <InfoMessage>
                <span>
                  Listing currency will set the currency for new listings. If you change it current listings will not be affected.{" "}
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
