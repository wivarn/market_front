import { SecondaryButtonFull, SubmitButtonFull } from "components/buttons";

import { CartApi } from "services/backendApi/cart";
import { ConditionPill } from "./condition";
import { IListingWithSeller } from "types/listings";
import ImageSlider from "components/listing/imageSlider";
import { InfoCard } from "./infoCard";
import Link from "next/link";
import { PrimaryButtonFull } from "components/buttons";
import { UserInfo } from "components/user";
import { toast } from "react-toastify";
import useSWR from "swr";
import { useSession } from "next-auth/client";

const ListingDetails = (props: IListingWithSeller): JSX.Element => {
  const [session] = useSession();
  const isSeller = session?.accountId == props.accountId;
  const editable =
    props.aasm_state === "draft" || props.aasm_state === "active";

  function getAddress() {
    const { data, error } = useSWR(
      session ? ["account/address", session.accessToken] : null
    );

    return {
      addressResponse: data,
      addressLoading: !error && !data,
    };
  }

  const { addressResponse, addressLoading } = getAddress();
  const address = addressResponse?.data;
  const noAddress = addressLoading ? true : !Object.keys(address).length;

  async function addItem() {
    CartApi(session?.accessToken)
      .addItem(`${props.accountId}`, `${props.id}`)
      .then(() => {
        toast.success("Item added to cart");
      })
      .catch((error) => {
        toast.error(JSON.stringify(error.response.data));
      });
  }

  function renderButton() {
    if (!editable) return null;
    if (!session)
      return <PrimaryButtonFull text="Log in to purchase" href="/login" />;
    else if (isSeller) {
      return (
        <SecondaryButtonFull
          href={`/listings/${props.id}/edit`}
          text="Update Listing"
        />
      );
    } else {
      return (
        <SubmitButtonFull
          text="Add to Cart"
          disabled={noAddress}
          onClick={addItem}
        />
      );
    }
  }
  return (
    <div className="container p-2 mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="px-4 my-2">
          {props.photos.length ? (
            <ImageSlider imageMetas={props.photos} />
          ) : null}
        </div>
        <InfoCard>
          <h3 className="pb-2 mt-2 mb-8 text-center border-b">{props.title}</h3>
          <span className="text-xl font-semibold md:text-2xl text-accent-darker">
            {Number(props.price).toLocaleString("en", {
              style: "currency",
              currency: "usd",
            })}{" "}
          </span>
          <span className="text-md text-accent-darker">{props.currency}</span>
          <span className="ml-8">
            <ConditionPill
              grading_company={props.grading_company}
              condition={props.condition}
            />
          </span>
          <div className="text-sm leading-none text-accent-dark">
            +
            {Number(props.domestic_shipping).toLocaleString("en", {
              style: "currency",
              currency: "usd",
            })}{" "}
            Shipping
          </div>
          <div className="mt-2">
            {renderButton()}
            <div className="my-8"></div>
            <Link href={`/users/${props.accountId}`}>
              <a>
                <UserInfo {...props.seller} />
              </a>
            </Link>
          </div>
        </InfoCard>
      </div>
      <InfoCard>
        <h4 className="pb-2 text-center border-b">About this item</h4>
        <div className="my-2 ">{props.description}</div>
      </InfoCard>
      <InfoCard>
        <h4 className="pb-2 text-center border-b">Recent Seller Reviews</h4>
        <div className="pt-4">
          <p>Coming Soon</p>
        </div>
      </InfoCard>
    </div>
  );
};

export default ListingDetails;
