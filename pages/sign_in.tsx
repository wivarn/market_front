import {
  AmplifyAuthenticator,
  AmplifyFormField,
  AmplifySignUp,
} from "@aws-amplify/ui-react";

export default function SignIn() {
  return (
    <AmplifyAuthenticator usernameAlias="email">
      {/* <AmplifySignUp
        usernameAlias="email"
        slot="sign-up"
        // formFields={[
        //   { type: "email" },
        //   { type: "password" },
        // ]}
      >
      </AmplifySignUp> */}
    </AmplifyAuthenticator>
  );
}
