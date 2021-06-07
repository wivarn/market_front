import "../styles/global.css";

import { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import Footer from "components/footer";
import Head from "next/head";
import Header from "components/header";
import Layout from "components/layout";
import { Provider } from "next-auth/client";
import SEO from "next-seo-config";
import { SWRConfig } from "swr";
import { StrictMode } from "react";
import Toast from "components/toast";
import { fetcher } from "services/backendApi/fetcher";

function Market({ Component, pageProps }: AppProps) {
  return (
    <StrictMode>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <DefaultSeo {...SEO} />
      <Provider session={pageProps.session}>
        <SWRConfig value={{ fetcher: fetcher }}>
          <Layout>
            <Header />
            <Component {...pageProps} />
            <Toast />
            <Footer />
          </Layout>
        </SWRConfig>
      </Provider>
    </StrictMode>
  );
}

export default Market;
