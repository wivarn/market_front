import "tailwindcss/tailwind.css";
import Header from "../components/header";
import Footer from "../components/footer";
import { AppProps } from "next/app";
import { StrictMode } from "react";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo-config";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StrictMode>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <DefaultSeo {...SEO} />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </StrictMode>
  );
}

export default MyApp;
