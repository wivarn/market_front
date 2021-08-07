import * as Yup from "yup";

import { Form, Formik } from "formik";
import { GenericErrorMessage, InfoMessage } from "components/message";
import { useEffect, useState } from "react";

import { DropdownCombobox } from "../fields";
import FormContainer from "../container";
import { IProfile } from "types/account";
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
  const [session, sessionLoading] = useSession();
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (sessionLoading) return;
    ProfileApi(session?.accessToken)
      .get()
      .then((profileResponse) => {
        setProfile(profileResponse.data);
      })
      .catch(() => {
        setError(true);
      });
  }, [sessionLoading]);

  if (sessionLoading || !profile) return <SpinnerLg text="Loading..." />;
  if (error) return <GenericErrorMessage />;

  return (
    <FormContainer>
      <Formik
        initialValues={{
          currency: profile.currency,
        }}
        validationSchema={paymentSchema}
        onSubmit={(values, actions) => {
          const formData = new FormData();
          formData.append("currency", `${values.currency}`);
          ProfileApi(session?.accessToken)
            .update(formData)
            .then(() => {
              toast.success("Your listing currency has been updated");
            })
            .finally(() => {
              actions.setSubmitting(false);
            });
        }}
      >
        {(formik) => (
          <Form>
            <div className="my-2 space-y-2">
              <h5 className="text-center text-accent-darker">
                Listing Settings
              </h5>
              <InfoMessage>
                <span>
                  This will set the currency for new listings. If you change it
                  current listings will not be affected.{" "}
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
