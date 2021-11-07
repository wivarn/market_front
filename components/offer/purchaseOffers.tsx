import { IOfferDetailed } from "types/offer";
import { PurchaseOffer } from "components/offer";

interface IProps {
  offers: IOfferDetailed[];
}

export default function PurchaseOffers({ offers }: IProps): JSX.Element {
  if (offers.length == 0) {
    return (
      <div>
        <h3 className="text-center">Purchase Offers</h3>
        <p className="mt-2 mb-4 text-center">
          You have no active purchase offers
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-center">Purchase Offers</h3>
      {offers.map((offer) => {
        return <PurchaseOffer key={offer.id} {...offer} />;
      })}
    </div>
  );
}
