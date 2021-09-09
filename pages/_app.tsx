import "../styles/global.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import GoogleAnalytics from "components/googleAnalytics";
import Head from "next/head";
import Layout from "components/layout";
import { Provider } from "next-auth/client";
import SEO from "next-seo-config";
import { SWRConfig } from "swr";
import { StrictMode } from "react";
import Toast from "components/toast";
import { UserSettingsProvider } from "contexts/userSettings";
import { WixAnswers } from "components/wixAnswers";
import { accessTokenAgeSeconds } from "constants/auth";
import { fetcher } from "services/backendApi/fetcher";

function Market({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <StrictMode>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" key="favicon" />
      </Head>
      <DefaultSeo
        {...SEO}
        openGraph={{
          url: "https://skwirl.io",
          images: [
            {
              url: "https://skwirl.io/banner.png",
              width: 1200,
              height: 675,
              alt:
                "Skwirl Marketplace | Buy, sell and admire sports cards, trading cards and collectibles",
            },
          ],
        }}
      />
      <GoogleAnalytics />
      <Provider
        session={pageProps.session}
        options={{ clientMaxAge: accessTokenAgeSeconds }}
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
      </Provider>
    </StrictMode>
  );
}

export default Market;
