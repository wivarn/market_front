import "../styles/global.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import GoogleAnalytics from "components/googleAnalytics";
import Head from "next/head";
import Layout from "components/layout";
import SEO from "next-seo-config";
// import { SWRConfig } from "swr";
import Script from "next/script";
import { SessionProvider } from "next-auth/react";
import { StrictMode } from "react";
// import Toast from "components/toast";
import { UserSettingsProvider } from "contexts/userSettings";
import { WixAnswers } from "components/wixAnswers";
import { accessTokenAgeSeconds } from "constants/auth";
// import { fetcher } from "services/backendApi/fetcher";
import { useRouter } from "next/router";

function Market({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps): JSX.Element {
  const router = useRouter();

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
      <DefaultSeo
        {...SEO}
        openGraph={{
          url: process.env.NEXT_PUBLIC_VERCEL_URL + router.asPath,
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
      <SessionProvider
        session={session}
        refetchInterval={accessTokenAgeSeconds}
      >
        {/* <SWRConfig value={{ fetcher: fetcher }}> */}
        <UserSettingsProvider>
          <Layout>
            <WixAnswers />
            <Component {...pageProps} />
            {/* <Toast /> */}
          </Layout>
        </UserSettingsProvider>
        {/* </SWRConfig> */}
      </SessionProvider>
    </StrictMode>
  );
}

export default Market;
