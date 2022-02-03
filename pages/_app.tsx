import "../styles/global.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { AppProps } from "next/app";
import Head from "next/head";
import Layout from "components/layout";
import { SWRConfig } from "swr";
import Script from "next/script";
import { SessionProvider } from "next-auth/react";
import { StrictMode } from "react";
import { accessTokenAgeSeconds } from "constants/auth";
import dynamic from "next/dynamic";
import { fetcher } from "services/backendApi/fetcher";

const GoogleAnalytics = dynamic(() => import("components/googleAnalytics"));
const DefaultNextSeo = dynamic(() => import("components/defaultNextSeo"));
const UserSettingsProvider = dynamic(() => import("contexts/userSettings"));
const WixAnswers = dynamic(() => import("components/wixAnswers"));
const Toast = dynamic(() => import("components/toast"));

function Market({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps): JSX.Element {
  return (
    <StrictMode>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.png" key="favicon" />
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
      </Head>
      <GoogleAnalytics />
      <DefaultNextSeo />
      <SessionProvider
        session={session}
        refetchInterval={accessTokenAgeSeconds}
      >
        <SWRConfig value={{ fetcher: fetcher }}>
          <UserSettingsProvider>
            <Layout>
              <WixAnswers />
              <Component {...pageProps} />
              <Toast />
            </Layout>
          </UserSettingsProvider>
        </SWRConfig>
      </SessionProvider>
    </StrictMode>
  );
}

export default Market;
