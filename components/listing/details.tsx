import { SecondaryButtonFull, SubmitButtonFull } from "components/buttons";

import { CartApi } from "services/backendApi/cart";
import { ConditionPill } from "./condition";
import { IListingWithSeller } from "types/listings";
import ImageSlider from "components/listing/imageSlider";
import { InfoCard } from "./infoCard";
import Link from "next/link";
import { PrimaryButtonFull } from "components/buttons";
import { UserInfo } from "components/user";
import { categoryList } from "constants/listings";
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
  const category = categoryList.find((c) => c.value == props.category);
  const subCategory = category?.subCategory.find(
    (s) => s.value == props.subcategory
  );

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
      <div className="grid grid-cols-1 xl:grid-cols-2">
        <div className="my-4 lg:px-4">
          {props.photos.length ? (
            <ImageSlider imageMetas={props.photos} />
          ) : null}
        </div>
        <InfoCard>
          <h2 className="pb-2 mt-2 mb-4 text-lg border-b sm:text-xl md:text-2xl">
            {props.title}
          </h2>
          <div>
            <span className="text-xl font-semibold md:text-2xl text-accent-darker">
              {Number(props.price).toLocaleString("en", {
                style: "currency",
                currency: "usd",
              })}{" "}
            </span>
            <span className="text-md text-accent-darker">{props.currency}</span>
            <div className="text-sm leading-none text-accent-dark">
              +
              {Number(props.domestic_shipping).toLocaleString("en", {
                style: "currency",
                currency: "usd",
              })}{" "}
              Shipping
            </div>
          </div>
          <div className="my-4">{renderButton()}</div>
          <div className="grid grid-cols-1 my-4 space-y-4 sm:grid-cols-2">
            <div>
              <label className="font-semibold text-accent-darker">
                Category
              </label>
              <div>
                <Link href={`/listings/search?category=${props.category}`}>
                  <a className="underline text-info hover:text-primary">
                    {category?.text}
                  </a>
                </Link>
              </div>
            </div>
            <div>
              <label>Sub-Category</label>
              <div>
                <Link
                  href={`/listings/search?category=${props.category}&subcategory=${props.subcategory}`}
                >
                  <a className="underline text-info hover:text-primary">
                    {subCategory?.text}
                  </a>
                </Link>
              </div>
            </div>
            <div>
              <label className="font-semibold text-accent-darker">Tags</label>
            </div>

            <div>
              <label className="font-semibold text-accent-darker">
                Condition
              </label>
              <div>
                <ConditionPill
                  grading_company={props.grading_company}
                  condition={props.condition}
                />
              </div>
            </div>
          </div>

          <div className="my-4">
            <h5>Combined Shipping</h5>
            {props.combined_shipping ? (
              <div className=" text-accent-darker">
                Each additonal item purchased from this seller will cost{" "}
                {Number(props.combined_shipping).toLocaleString("en", {
                  style: "currency",
                  currency: "usd",
                })}{" "}
                for shipping.
              </div>
            ) : (
              "Seller does not offer combined shipping for this item."
            )}
            <div className="font-semibold text-accent-darker">
              {props.combined_shipping}
            </div>
          </div>
          <div className="my-8"></div>
          <h5>Seller Information</h5>
          <Link href={`/users/${props.accountId}`}>
            <a>
              <UserInfo {...props.seller} />
            </a>
          </Link>
        </InfoCard>
      </div>
      <InfoCard>
        <h4 className="pb-2 text-center border-b ">Decription</h4>
        <div className="pt-4">{props.description}</div>
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
