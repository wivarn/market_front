import {
  IOverflowMenuItem,
  OverflowButton,
} from "components/buttons/overflowButton";

import { IOffer } from "types/offer";
import Link from "next/dist/client/link";
import { ListingPreviewList } from "components/listing/preview";

interface IOfferProps {
  offer: IOffer;
  menuItems: IOverflowMenuItem[];
  headerText: string;
  offerUserHeader: string;
  offerUserLink: JSX.Element;
}

export const SaleOffer = (props: IOffer): JSX.Element => {
  const counter = props.counter;
  const headerText = counter ? "Counter Offer Sent" : "Offer Recieved";
  const menuItems = () => {
    const items: IOverflowMenuItem[] = [];

    const acceptOffer = async () => {
      // do something
    };

    const counterOffer = async () => {
      // do something
    };

    const declineOffer = async () => {
      // do something
    };

    const cancelOffer = async () => {
      // do something
    };

    const openHistoryModal = async () => {
      // do something
    };

    items.push({
      href: `/messages/${props.buyer.id}`,
      text: "Message Buyer",
    });

    if (!counter) {
      items.push(
        {
          href: "#",
          text: "Accept Offer",
          onClick: acceptOffer,
        },
        {
          href: "#",
          text: "Counter Offer",
          onClick: counterOffer,
        },
        {
          href: "#",
          text: "Decline Offer",
          onClick: declineOffer,
        }
      );
    } else {
      items.push({
        href: "#",
        text: "Cancel Offer",
        onClick: cancelOffer,
      });
    }

    items.push({
      href: "#",
      text: "View History",
      onClick: openHistoryModal,
    });

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
    const items: IOverflowMenuItem[] = [];

    const acceptOffer = async () => {
      // do something
    };

    const counterOffer = async () => {
      // do something
    };

    const declineOffer = async () => {
      // do something
    };

    const cancelOffer = async () => {
      // do something
    };

    const openHistoryModal = async () => {
      // do something
    };

    items.push({
      href: `/messages/${props.seller.id}`,
      text: "Message Seller",
    });

    if (counter) {
      items.push(
        {
          href: "#",
          text: "Accept Offer",
          onClick: acceptOffer,
        },
        {
          href: "#",
          text: "Counter Offer",
          onClick: counterOffer,
        },
        {
          href: "#",
          text: "Decline Offer",
          onClick: declineOffer,
        }
      );
    } else {
      items.push({
        href: "#",
        text: "Cancel Offer",
        onClick: cancelOffer,
      });
    }

    items.push({
      href: "#",
      text: "View History",
      onClick: openHistoryModal,
    });

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
      <OverflowButton
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
