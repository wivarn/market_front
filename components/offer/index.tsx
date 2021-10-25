import { IOffer } from "types/offer";
import Link from "next/dist/client/link";
import { ListingPreviewList } from "components/listing/preview";
import { OfferApi } from "services/backendApi/offer";
import { OverflowMenuJsx } from "components/buttons/overflowMenuJsx";
import { useSession } from "next-auth/client";

interface IOfferProps {
  offer: IOffer;
  menuItems: JSX.Element[];
  headerText: string;
  offerUserHeader: string;
  offerUserLink: JSX.Element;
}

export const SaleOffer = (props: IOffer): JSX.Element => {
  const [session] = useSession();

  const counter = props.counter;
  const headerText = counter ? "Counter Offer Sent" : "Offer Recieved";
  const menuItems = () => {
    const items: JSX.Element[] = [];

    const acceptOffer = async () => {
      // do something
    };

    const counterOffer = async () => {
      OfferApi(session?.accessToken).createCounter(props.id, 123);
    };

    const rejectOffer = async () => {
      // do something
    };

    const cancelOffer = async () => {
      // do something
    };

    const openHistoryModal = async () => {
      // do something
    };

    items.push(
      <Link href={`/messages/${props.buyer.id}`}>
        <a>Message Buyer</a>
      </Link>
    );

    if (!counter) {
      items.push(
        <a onClick={acceptOffer}>Accept Offer</a>,
        <a onClick={counterOffer}>Counter Offer</a>,
        <a onClick={rejectOffer}>Reject Offer</a>
      );
    } else {
      items.push(<a onClick={cancelOffer}>Cancel Offer</a>);
    }

    items.push(<a onClick={openHistoryModal}>View History</a>);

    return items;
  };
  const offerUserHeader = () => {
    return counter ? "Offer To" : "Offer From";
  };
  const offerUserLink = () => {
    return (
      <Link href={`/users/${props.buyer.id}`}>
        <a className="underline hover:text-primary">{props.buyer.full_name}</a>
      </Link>
    );
  };

  return (
    <Offer
      offer={props}
      menuItems={menuItems()}
      headerText={headerText}
      offerUserHeader={offerUserHeader()}
      offerUserLink={offerUserLink()}
    />
  );
};

export const PurchaseOffer = (props: IOffer): JSX.Element => {
  const counter = props.counter;
  const headerText = counter ? "Counter Offer Recieved" : "Offer Sent";
  const menuItems = () => {
    const items: JSX.Element[] = [];

    const acceptOffer = async () => {
      // do something
    };

    const counterOffer = async () => {
      // do something
    };

    const rejectOffer = async () => {
      // do something
    };

    const cancelOffer = async () => {
      // do something
      console.log("clicked cancel");
    };

    const openHistoryModal = async () => {
      // do something
    };

    items.push(
      <Link href={`/messages/${props.seller.id}`}>
        <a>Message Seller</a>
      </Link>
    );

    if (counter) {
      items.push(
        <a onClick={acceptOffer}>Accept Offer</a>,
        <a onClick={counterOffer}>Counter Offer</a>,
        <a onClick={rejectOffer}>Reject Offer</a>
      );
    } else {
      items.push(<a onClick={cancelOffer}>Cancel Offer</a>);
    }

    items.push(<a onClick={openHistoryModal}>View History</a>);

    return items;
  };
  const offerUserHeader = () => {
    return counter ? "Offer From" : "Offer To";
  };
  const offerUserLink = () => {
    return (
      <Link href={`/users/${props.seller.id}`}>
        <a className="underline hover:text-primary">{props.seller.full_name}</a>
      </Link>
    );
  };

  return (
    <Offer
      offer={props}
      menuItems={menuItems()}
      headerText={headerText}
      offerUserHeader={offerUserHeader()}
      offerUserLink={offerUserLink()}
    />
  );
};

export const Offer = (props: IOfferProps): JSX.Element => {
  const offer = props.offer;

  const renderOverflowButton = () => {
    return (
      <OverflowMenuJsx
        menutItems={props.menuItems}
        menuItemsClassName="-right-8"
      />
    );
  };

  return (
    <div className="max-w-4xl mx-auto mt-4 rounded-md shadow-md">
      <div>
        <div className="relative flex items-center px-4 py-2 space-x-2 text-white bg-info-darker rounded-t-md">
          {props.headerText}
          <span className="absolute right-3">{renderOverflowButton()}</span>
        </div>
        <table className="w-full border-b table-fixed">
          <thead className="bg-accent-lighter">
            <tr className="text-sm md:text-base">
              <th className="w-1/3">{props.offerUserHeader}</th>
              <th className="w-1/3">Time Remaining</th>
              <th className="w-1/3">Offer Amount</th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr className="text-sm md:text-base">
              <td>{props.offerUserLink}</td>
              <td>
                {Math.abs(Number(new Date(offer.expires_at)) - Date.now()) /
                  (60 * 60 * 1000)}{" "}
                Hours
              </td>
              <td>
                {Number(offer.amount).toLocaleString("en", {
                  style: "currency",
                  currency: "usd",
                })}{" "}
                {offer.listing.currency}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <ListingPreviewList key={offer.listing.id} {...offer.listing} />
      </div>
    </div>
  );
};
