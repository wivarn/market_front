import { NextSeo } from "next-seo";
import PageContainer from "components/pageContainer";
import PurchaseOffers from "components/offer/purchaseOffers";
import SalesOffers from "components/offer/salesOffers";

export default function Offers(): JSX.Element {
  return (
    <div className="my-4">
      <NextSeo title="Purchases" />
      <PageContainer>
        <PurchaseOffers />
        <SalesOffers />
      </PageContainer>
    </div>
  );
}
