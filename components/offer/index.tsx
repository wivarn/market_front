import { IOffer } from "types/offer";
import Link from "next/dist/client/link";
import { ListingPreviewList } from "components/listing/preview";
import Modal from "components/modal";
import { OfferApi } from "services/backendApi/offer";
import { OverflowMenuJsx } from "components/buttons/overflowMenuJsx";
import { useSession } from "next-auth/client";

interface IOfferProps {
  offer: IOffer;
  menuItems: JSX.Element[];
  headerText: string;
  offerUserHeader: string;
  offerUserLink: JSX.Element;
  hiddenElements?: JSX.Element[];
}

const offerAmount = (offer: IOffer) => {
  return `${Number(offer.amount).toLocaleString("en", {
    style: "currency",
    currency: "usd",
  })} ${offer.listing.currency}`;
};

const acceptOffer = async (accessToken: string, id: string) => {
  OfferApi(accessToken).accept(id);
};

const counterOffer = async (accessToken: string, id: string) => {
  OfferApi(accessToken).createCounter(id, 1.23);
};

const rejectOffer = async (accessToken: string, id: string) => {
  OfferApi(accessToken).reject(id);
};

const cancelOffer = async (accessToken: string, id: string) => {
  OfferApi(accessToken).cancel(id);
};

const openHistoryModal = async () => {
  // do something
};

export const SaleOffer = (props: IOffer): JSX.Element => {
  const [session] = useSession();

  const counter = props.counter;
  const headerText = counter ? "Counter Offer Sent" : "Offer Recieved";
  const [acceptMenuItem, acceptModal] = Modal({
    modalToggle: "Accept Offer",
    title: "Accept Offer?",
    body: (
      <p>
        Confirm that you want to accept the offer of {offerAmount(props)} +
        shipping for this item.
        <br />
        If you accept the offer then it will no longer be available for sale.
        The buyer will have 48 hours to pay for the item.
      </p>
    ),
    submitAction: () => acceptOffer(`${session?.accessToken}`, props.id),
    submitText: "Accept Offer",
  });
  const [counterMenuItem, counterModal] = Modal({
    modalToggle: "Counter Offer",
    title: "Submit Counter Offer",
    body: (
      <p>
        Submit a counter offer for this item to the buyer. If accepted they are
        obligated to pay for the item within 48 hours.
      </p>
    ),
    submitAction: () => counterOffer(`${session?.accessToken}`, props.id),
    submitText: "Submit Offer",
  });
  const [rejectMenuItem, rejectModal] = Modal({
    modalToggle: "Reject Offer",
    title: "Reject Offer?",
    body: (
      <p>
        Confirm that you want to reject the offer of {offerAmount(props)} +
        shipping for this item. We will notify the buyer that you have rejected
        their offer.
      </p>
    ),
    submitAction: () => rejectOffer(`${session?.accessToken}`, props.id),
    submitText: "Reject Offer",
  });
  const [cancelMenuItem, cancelModal] = Modal({
    modalToggle: "Cancel Offer",
    title: "Cancel Offer?",
    body: (
      <p>
        Confirm that you want to cancel the offer of {offerAmount(props)} +
        shipping for this item. We will notify the seller that you have
        cancelled your offer.
      </p>
    ),
    submitAction: () => cancelOffer(`${session?.accessToken}`, props.id),
    submitText: "Cancel Offer",
  });
  const menuItems = () => {
    const items: JSX.Element[] = [];

    items.push(
      <Link href={`/messages/${props.buyer.id}`}>
        <a>Message Buyer</a>
      </Link>
    );

    if (!counter) {
      items.push(acceptMenuItem, counterMenuItem, rejectMenuItem);
    } else {
      items.push(cancelMenuItem);
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
  const hiddenElements = [acceptModal, counterModal, rejectModal, cancelModal];

  return (
    <>
      <Offer
        offer={props}
        menuItems={menuItems()}
        headerText={headerText}
        offerUserHeader={offerUserHeader()}
        offerUserLink={offerUserLink()}
        hiddenElements={hiddenElements}
      />
    </>
  );
};

export const PurchaseOffer = (props: IOffer): JSX.Element => {
  const [session] = useSession();

  const counter = props.counter;
  const headerText = counter ? "Counter Offer Recieved" : "Offer Sent";
  const [acceptMenuItem, acceptModal] = Modal({
    modalToggle: "Accept Offer",
    title: "Accept Offer?",
    body: (
      <p>
        Confirm that you want to accept the offer of {offerAmount(props)} +
        shipping for this item.
        <br />
        If you accept the offer then it will no longer be available for sale.
        You will have 48 hours to pay for the item.
      </p>
    ),
    submitAction: () => acceptOffer(`${session?.accessToken}`, props.id),
    submitText: "Accept Offer",
  });
  const [counterMenuItem, counterModal] = Modal({
    modalToggle: "Counter Offer",
    title: "Submit Counter Offer",
    body: (
      <p>
        Submit a counter offer for this item to the seller. If accepted you are
        obligated to pay for the item within 48 hours.
      </p>
    ),
    submitAction: () => counterOffer(`${session?.accessToken}`, props.id),
    submitText: "Submit Offer",
  });
  const [rejectMenuItem, rejectModal] = Modal({
    modalToggle: "Reject Offer",
    title: "Reject Offer?",
    body: (
      <p>
        Confirm that you want to reject the counter offer of{" "}
        {offerAmount(props)} + shipping for this item. We will notify the seller
        that you have rejected their counter offer.
      </p>
    ),
    submitAction: () => rejectOffer(`${session?.accessToken}`, props.id),
    submitText: "Reject Offer",
  });
  const [cancelMenuItem, cancelModal] = Modal({
    modalToggle: "Cancel Offer",
    title: "Cancel Offer?",
    body: (
      <p>
        Confirm that you want to cancel the offer of {offerAmount(props)} +
        shipping for this item. We will notify the seller that you have
        cancelled your offer.
      </p>
    ),
    submitAction: () => cancelOffer(`${session?.accessToken}`, props.id),
    submitText: "Cancel Offer",
  });
  const menuItems = () => {
    const items: JSX.Element[] = [];

    items.push(
      <Link href={`/messages/${props.seller.id}`}>
        <a>Message Seller</a>
      </Link>
    );

    if (counter) {
      items.push(acceptMenuItem, counterMenuItem, rejectMenuItem);
    } else {
      items.push(cancelMenuItem);
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
  const hiddenElements = [acceptModal, counterModal, rejectModal, cancelModal];

  return (
    <Offer
      offer={props}
      menuItems={menuItems()}
      headerText={headerText}
      offerUserHeader={offerUserHeader()}
      offerUserLink={offerUserLink()}
      hiddenElements={hiddenElements}
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
    <>
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
                <td>{offerAmount(offer)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <ListingPreviewList key={offer.listing.id} {...offer.listing} />
        </div>
      </div>
      {props.hiddenElements?.map((element) => {
        return element;
      })}
    </>
  );
};
