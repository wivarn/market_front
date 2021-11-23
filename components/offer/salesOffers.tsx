import { IOfferDetailed } from "types/offer";
import { SaleOffer } from "components/offer";

interface IProps {
  offers: IOfferDetailed[];
}

export default function SalesOffers({ offers }: IProps): JSX.Element {
  if (offers.length == 0) {
    return (
      <div className="mt-4">
        <h3 className="text-center">Sales Offers</h3>
        <p className="text-center">You have no active sales offers</p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h3 className="text-center">Sales Offers</h3>
      {offers.map((offer) => {
        return <SaleOffer key={offer.id} {...offer} />;
      })}
    </div>
  );
}
