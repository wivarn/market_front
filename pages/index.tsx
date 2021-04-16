import { useAuthContext } from '../contexts/auth'
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

export default function Home() {
  const {user} = useAuthContext()
  if (user) {
    return (
      <div>
        Hello {user.attributes.email}
        <AmplifySignOut />
      </div>
    )
  } else {
    return <div>You are not signed in</div>
  }
}
