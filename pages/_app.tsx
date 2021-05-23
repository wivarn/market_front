import "tailwindcss/tailwind.css";
import Header from "../components/header";
import Footer from "../components/footer";
import { AppProps } from "next/app";
import { StrictMode } from "react";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo-config";
import { AuthProvider } from "../contexts/auth";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StrictMode>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <DefaultSeo {...SEO} />
      <AuthProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </AuthProvider>
    </StrictMode>
  );
}

export default MyApp;
