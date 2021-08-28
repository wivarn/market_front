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
import { StrictMode } from "react";
import Toast from "components/toast";
import { UserSettingsProvider } from "contexts/userSettings";
import { WixAnswers } from "components/wixAnswers";
import { accessTokenAge } from "constants/auth";
import { fetcher } from "services/backendApi/fetcher";
import { useEffect } from "react";
import { useRouter } from "next/router";

function Market({ Component, pageProps }: AppProps): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
        page_path: url,
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <StrictMode>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" key="favicon" />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
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
                <WixAnswers />
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
