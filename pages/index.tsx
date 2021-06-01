import { NextSeo } from "next-seo";
import { PromoCard } from "components/promoCards";
import SearchForm from "components/forms/search";

export default function Home() {
  return (
    <div>
      <NextSeo title="Home" />
      <SearchForm />
      <div>
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3 justify-items-center">
          <PromoCard
            title="Follow us on SubscribeStar"
            text="Subscribe to us and recieve insight into our roadmap as well as buyer and seller perks. We even send our backers a collectible surprise pack each month!"
            image="/images/subscribe_star.jpg"
            url="https://www.subscribestar.com/"
          />
          <PromoCard
            title="Get expert selling tips on Youtube"
            text="Head on over to our Youtube channel to get tips on selling, collecting and more!"
            image="/images/youtube.jpg"
            url="https://www.youtube.com/"
          />
        </div>
      </div>
    </div>
  );
}
