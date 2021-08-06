import { Description } from "@headlessui/react/dist/components/description/description";
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
      <NextSeo
        title="Home"
        openGraph={{
          url: "https://skwirl.io",
          title: "Skwirl",
          description: "The social marketplace for modern collectors",
          images: [
            {
              url:
                "https://images.unsplash.com/photo-1593642702909-dec73df255d7?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
              alt: "Skwirl Collector Marketplace",
            },
          ],
          site_name: "Skwirl",
        }}
        twitter={{
          handle: "@skwirl_io",
          site: "@skwirl",
          cardType: "summary_large_image",
        }}
      />
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
