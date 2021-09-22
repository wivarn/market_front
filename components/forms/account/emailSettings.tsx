import * as Yup from "yup";

import { Form, Formik } from "formik";
import { useEffect, useState } from "react";

import { EmailSettingsApi } from "services/backendApi/emailSettings";
import FormContainer from "../container";
import { GenericErrorMessage } from "components/message";
import { IEmailSettings } from "types/account";
import { SpinnerLg } from "components/spinner";
import { SubmitButtonFull } from "components/buttons";
import { Toggle } from "../fields";
import { toast } from "react-toastify";
import { useSession } from "next-auth/client";

const emailSettingsSchema = Yup.object().shape({
  marketing: Yup.boolean().required("required"),
});

export default function EmailSettingsForm(): JSX.Element {
  const [session, sessionLoading] = useSession();
  const [emailSettings, setEmailSettings] = useState<IEmailSettings | null>(
    null
  );
  const [error, setError] = useState(false);
  const [marketing, setMarketing] = useState<boolean>(false);

  function fetchEmailSettings() {
    EmailSettingsApi(session?.accessToken)
      .get()
      .then((emailSettingsResponse) => {
        setEmailSettings(emailSettingsResponse.data);
        setMarketing(emailSettingsResponse.data.marketing);
      })
      .catch(() => {
        setError(true);
      });
  }

  useEffect(() => {
    if (sessionLoading) return;

    fetchEmailSettings();
  }, [sessionLoading]);

  if (sessionLoading || !emailSettings) return <SpinnerLg text="Loading..." />;
  if (error) return <GenericErrorMessage />;

  return (
    <FormContainer>
      <Formik
        initialValues={{
          marketing: emailSettings.marketing,
        }}
        validationSchema={emailSettingsSchema}
        onSubmit={(values, actions) => {
          EmailSettingsApi(session?.accessToken)
            .update(values)
            .then((emailSettingsResponse) => {
              toast.success("Your email settings have been updated");
              setEmailSettings(emailSettingsResponse.data);
            })
            .catch((error) => {
              toast.error(error.response.data.error);
              fetchEmailSettings();
            })
            .finally(() => {
              actions.setSubmitting(false);
            });
        }}
      >
        {(formik) => (
          <Form>
            <div className="my-2 space-y-2">
              <Toggle
                name="marketing"
                label="Marketing Emails"
                enabled={marketing}
                setEnabled={setMarketing}
                onClick={async () => {
                  formik.setFieldValue("marketing", !marketing);
                }}
              />

              <SubmitButtonFull
                text="Update Email Settings"
                submitting={formik.isSubmitting}
              />
            </div>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
}
