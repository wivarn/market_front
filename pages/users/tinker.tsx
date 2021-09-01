import * as Yup from "yup";

import { Form, Formik } from "formik";

import FormContainer from "components/forms/container";
import { SpinnerLg } from "components/spinner";
import { SubmitButton } from "components/buttons";
import { TextField } from "components/forms/fields";
import { UserApi } from "services/backendApi/user";
import { toast } from "react-toastify";
import { useSession } from "next-auth/client";

const updateRoleSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  role: Yup.string().required("Required"),
});

export default function UpdateRole(): JSX.Element {
  const [session, sessionLoading] = useSession();

  if (sessionLoading) return <SpinnerLg />;

  return (
    <FormContainer>
      <h3 className="py-4 text-center border-b border-accent">Update Role</h3>
      <div className="py-2">
        <Formik
          initialValues={{
            email: "",
            role: "",
          }}
          validationSchema={updateRoleSchema}
          onSubmit={(values, actions) => {
            UserApi(session?.accessToken)
              .updateRole(values.email, values.role)
              .then((response) => {
                toast.success(response.data.role);
              })
              .catch((error) => {
                console.log(error.response);
                toast.error(error.response.status || "error");
              })
              .finally(() => {
                actions.setSubmitting(false);
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="my-2 space-y-4">
                <TextField
                  name="email"
                  label="Email"
                  id="update-role-email"
                  type="email"
                  placeholder="Email"
                />

                <TextField
                  name="role"
                  label="Role"
                  id="update-role-role"
                  placeholder="role"
                />

                <SubmitButton text="Update Role" submitting={isSubmitting} />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </FormContainer>
  );
}
