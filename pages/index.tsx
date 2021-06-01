import { NextSeo } from "next-seo";
import { PromoCard } from "components/promoCards";
import SearchForm from "components/forms/search";

export default function Home() {
  return (
    <div>
      <NextSeo title="Home" />
      <SearchForm />
      <div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
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
      </div>
    </div>
  );
}
