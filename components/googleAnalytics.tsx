import Script from "next/script";
import { useEffect } from "react";
import { useRouter } from "next/router";

declare const window: any;

export default function GoogleAnalytics(): JSX.Element {
  const router = useRouter();

  if (process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS) {
    useEffect(() => {
      const handleRouteChange = (url: string) => {
        window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
          page_path: url,
        });
      };
      router.events.on("routeChangeComplete", handleRouteChange);
      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
      };
    }, [router.events]);
  } else {
    return <></>;
  }
  return (
    <Script
      id="google-analytics-inline"
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
  );
}
