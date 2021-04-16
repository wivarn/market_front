import {AmplifyAuthenticator, AmplifyFormField, AmplifySignUp} from "@aws-amplify/ui-react";

export default function SignIn() {
  return (
    <AmplifyAuthenticator>

      {/* <AmplifySignUp
        usernameAlias="email"
        slot="sign-up"
        formFields={[
          { type: "email" },
          { type: "password" },
        ]}
      >
      </AmplifySignUp> */}
      {/* <AmplifySignIn slot="sign-in" usernameAlias="email" /> */}
    </ AmplifyAuthenticator>
  )
}
