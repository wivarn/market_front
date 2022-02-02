import { DefaultSeo } from "next-seo";
import SEO from "next-seo-config";
import { useRouter } from "next/router";

export default function DefaultNextSeo(): JSX.Element {
  const router = useRouter();

  return (
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
  );
}
