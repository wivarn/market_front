import * as Yup from "yup";

import { Form, Formik } from "formik";

import { DropdownCombobox } from "../fields";
import FormContainer from "../container";
import { InfoMessage } from "components/message";
import { ProfileApi } from "services/backendApi/profile";
import { SpinnerLg } from "components/spinner";
import { SubmitButtonFull } from "components/buttons";
import { UserSettingsContext } from "contexts/userSettings";
import { toast } from "react-toastify";
import { useContext } from "react";
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
  const { userSettings, updateUserSettings } = useContext(UserSettingsContext);

  if (sessionLoading) return <SpinnerLg text="Loading..." />;

  return (
    <FormContainer>
      <Formik
        initialValues={{
          currency: userSettings.currency,
        }}
        validationSchema={paymentSchema}
        onSubmit={(values, actions) => {
          const formData = new FormData();
          formData.append("currency", `${values.currency}`);
          ProfileApi(session?.accessToken)
            .update(formData)
            .then(() => {
              toast.success("Your listing currency has been updated");
              updateUserSettings(session?.accessToken);
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
                  <a
                    href="https://skwirl.zendesk.com/hc/en-us/articles/4405138160147-Getting-started-as-a-seller"
                    rel="noreferrer"
                    target="_blank"
                    className="underline text-info"
                  >
                    Learn more.
                  </a>
                </span>
              </InfoMessage>
              <DropdownCombobox
                label="Listing Currency"
                name="currency"
                items={currencyList}
              />

              <SubmitButtonFull
                text="Update Currency"
                submitting={formik.isSubmitting}
              />
            </div>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
}
