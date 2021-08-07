import Head from "next/head";
import Landing from "components/landing";
import { NextSeo } from "next-seo";
import PageContainer from "components/pageContainer";
import { PrimaryButton } from "components/buttons";
import { PromoCard } from "components/promoCards";
import { RecentListings } from "components/listing/recentListings";

export default function Home(): JSX.Element {
  if (process.env.NEXT_PUBLIC_FEATURE_LAUNCHED != "true") return <Landing />;

  return (
    <>
      <Head>
        <title>My page title</title>
        <meta
          property="og:title"
          content="Skwirl the marketplace"
          key="title"
        />
        <meta
          property="og:image"
          content="https://the.community.club/images/eXc7vhG5nxrA7X2J_N0N9SQKarocvgHuaXSf1booidg/s:1000:420/mb:500000/aHR0cHM6Ly90aGUu/Y29tbXVuaXR5LmNs/dWIvcmVtb3RlaW1h/Z2VzL3VwbG9hZHMv/YXJ0aWNsZXMvM3ly/OHZmc3NxYnhodGo1/amZja2wucG5n"
        />
        <meta property="og:url" content="http://skwirl.io" />
      </Head>
      <div className="w-full px-8 py-2 my-8 bg-gradient-to-t from-info via-info-dark to-info-darker text-accent-lightest">
        <div className="container mx-auto max-w-screen-2xl">
          <h4 className="mt-8 text-white">
            The social marketplace for modern collectors
          </h4>
          <h1 className="text-5xl font-bold text-white lg:text-6xl">
            Find the next centerpiece for your collection
          </h1>
          <PrimaryButton href="/account/new" text="Sign up now" />
          <div className="mb-8"></div>
        </div>
      </div>
      <RecentListings />
      <div className="my-8">
        <PageContainer>
          <h3 className="my-4 text-center text-accent-darker">
            Connect with us
          </h3>
          <div className="grid grid-cols-1 gap-1 my-8 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
            <PromoCard
              title="Become a member"
              text="Subscribe to different membership levels on buymeacoffee.com to receive perks and rewards for being supporters."
              imgSrc="/promo/subscribe_star.jpg"
              href="https://www.buymeacoffee.com/skwirl"
            />
            <PromoCard
              title="Watch us on Youtube"
              text="Head over to our Youtube channel to see videos on all things collectibles! Get the latest insider news and tips from the pros"
              imgSrc="/promo/youtube.jpg"
              href="https://www.youtube.com/channel/UCDe_aLZv7CoKLxiZxAPbDJg"
            />
            <PromoCard
              title="Get expert advice"
              text="Learn from our experts on how to up your selling game. We'll teach you how to list your items, price them appropriately and package up and ship them around the world. Don't know where to start? Don't worry, we're here to help."
              imgSrc="/promo/selling.jpg"
              href="/blog"
            />
          </div>
        </PageContainer>
      </div>
    </>
  );
}
