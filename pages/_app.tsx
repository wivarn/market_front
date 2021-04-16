import 'tailwindcss/tailwind.css'
import Layout from "../components/layout"
import { AppProps } from 'next/app'
import Auth from '@aws-amplify/auth'

Auth.configure({
  mandatorySignIn: false,
  region: process.env.AWS_REGION,
  userPoolId: process.env.USER_POOL_ID,
  userPoolWebClientId: process.env.USER_POOL_CLIENT_ID,
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
