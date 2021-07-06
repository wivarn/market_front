import Landing from "components/landing/landing";
import { NextSeo } from "next-seo";
import PageContainer from "components/pageContainer";
import { PrimaryButton } from "components/buttons";
import { PromoCard } from "components/promoCards";

export default function Home(): JSX.Element {
  if (process.env.NEXT_PUBLIC_FEATURE_LAUNCHED != "true") return <Landing />;

  return (
    <div>
      <NextSeo title="Home" />
      <div className="w-full px-8 py-2 my-8 bg-gradient-to-r from-info via-info-dark to-info-darkest text-accent-lightest">
        <PageContainer>
          <h4 className="mt-8 text-white">
            The marketplace for modern collectors
          </h4>
          <h1 className="text-6xl font-bold text-white">
            Find the next centerpiece for your collection
          </h1>
          <PrimaryButton href="#" text="Sign up now" />
          <div className="mb-8"></div>
        </PageContainer>
      </div>
      <PageContainer>
        <div className="grid grid-cols-1 gap-1 my-8 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
          <PromoCard
            title="Follow us on SubscribeStar"
            text="Subscribe to us and recieve insight into our roadmap as well as buyer and seller perks. We even send our backers a collectible surprise pack each month!"
            imgSrc="/promo/subscribe_star.jpg"
            href="https://www.subscribestar.com/"
          />
          <PromoCard
            title="Watch us on Youtube"
            text="Head on over to our Youtube channel to see videos on all things collectibles! Get the latest insider news and tips from the pros"
            imgSrc="/promo/youtube.jpg"
            href="https://www.youtube.com/"
          />
          <PromoCard
            title="Get expert selling tips"
            text="Learn from our experts on how to up your selling game. We'll teach you how to list your items, price them appropriately and package up and ship them around the world. Don't know where to start? Don't worry, we're here to help."
            imgSrc="/promo/selling.jpg"
            href="#"
          />
        </div>
      </PageContainer>
    </div>
  );
}
