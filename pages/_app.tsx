import "../styles/global.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import Head from "next/head";
import Layout from "components/layout";
import { Provider } from "next-auth/client";
import SEO from "next-seo-config";
import { SWRConfig } from "swr";
import Script from "next/script";
import { StrictMode } from "react";
import Toast from "components/toast";
import { UserSettingsProvider } from "contexts/userSettings";
import { fetcher } from "services/backendApi/fetcher";

function Market({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <StrictMode>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" key="favicon" />
      </Head>
      <DefaultSeo {...SEO} />
      {process.env.NEXT_PUBLIC_FEATURE_LAUNCHED != "true" ? (
        <>
          <Component {...pageProps} />
          <Toast />
        </>
      ) : (
        <Provider session={pageProps.session}>
          <SWRConfig value={{ fetcher: fetcher }}>
            <UserSettingsProvider>
              <Layout>
                <Script
                  id="ze-snippet"
                  src="https://static.zdassets.com/ekr/snippet.js?key=76fb5d50-93de-49d4-a24e-b570c83c5f15"
                />
                <Component {...pageProps} />
                <Toast />
              </Layout>
            </UserSettingsProvider>
          </SWRConfig>
        </Provider>
      )}
    </StrictMode>
  );
}

export default Market;
