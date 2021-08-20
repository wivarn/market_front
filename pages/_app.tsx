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
import { accessTokenAge } from "constants/auth";
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
        <Provider
          session={pageProps.session}
          options={{ clientMaxAge: accessTokenAge }}
        >
          <SWRConfig value={{ fetcher: fetcher }}>
            <UserSettingsProvider>
              <Layout>
                <Script type="text/javascript">!function(){function e(){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://skwirl.wixanswers.com/apps/widget/v1/skwirl/4b88128e-e3f5-4d0a-bde7-c03d193f89fe/en/embed.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}window.addEventListener?window.addEventListener("load",e):window.attachEvent("onload",e),window.AnswersWidget={onLoaded:function(e){window.AnswersWidget.queue.push(e)},queue:[]}}();</Script>
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
