import * as Yup from "yup";

import { Form, Formik } from "formik";
import { useEffect, useState } from "react";

import FormContainer from "components/forms/container";
import { GenericErrorMessage } from "components/message";
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

const userAttributes = [
  "id",
  "email",
  "given_name",
  "family_name",
  "status",
  "role",
  "fee",
];

export default function UpdateRole(): JSX.Element {
  const [session, sessionLoading] = useSession();
  const [users, setUser] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (sessionLoading) return;
    UserApi(session?.accessToken)
      .listRoles()
      .then((rolesReponse) => {
        setUser(rolesReponse.data);
      })
      .catch(() => {
        setError(true);
      });
  }, [sessionLoading]);

  if (error) return <GenericErrorMessage />;
  if (sessionLoading || !users) return <SpinnerLg text="Loading..." />;

  return (
    <>
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
                  toast.success("Role updated");
                  setUser(response.data);
                })
                .catch((error) => {
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
      <table className="flex-grow mx-auto table-auto">
        <thead>
          <tr>
            {userAttributes.map((attribute) => {
              return (
                <th key={attribute} className="border border-info-darker">
                  {attribute}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => {
            return (
              <tr key={user.id}>
                {userAttributes.map((attribute) => {
                  return (
                    <td key={attribute} className="border border-info-darker">
                      {user[attribute]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
