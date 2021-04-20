import "tailwindcss/tailwind.css";
import Layout from "../components/layout";
import { AppProps } from "next/app";
import Auth from "@aws-amplify/auth";
import { AuthProvider } from "../contexts/auth";
import { StrictMode } from "react";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo-config";

Auth.configure({
  mandatorySignIn: false,
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
  userPoolWebClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StrictMode>
      <AuthProvider>
        <Head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <DefaultSeo {...SEO} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </StrictMode>
  );
}

export default MyApp;
