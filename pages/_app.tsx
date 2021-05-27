import "../styles/global.css";

import { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import Footer from "components/footer";
import Head from "next/head";
import Header from "components/header";
import Layout from "components/layout";
import { Provider } from "next-auth/client";
import SEO from "next-seo-config";
import { StrictMode } from "react";

function Market({ Component, pageProps }: AppProps) {
  return (
    <StrictMode>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <DefaultSeo {...SEO} />
      <Provider session={pageProps.session}>
        <Layout>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </Layout>
      </Provider>
    </StrictMode>
  );
}

export default Market;
