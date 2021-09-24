import { SecondaryButtonFull, SubmitButtonFull } from "components/buttons";
import { useContext, useState } from "react";

import { CartApi } from "services/backendApi/cart";
import { ConditionPill } from "./condition";
import { IlistingDetails } from "types/listings";
import ImageSlider from "components/listing/imageSlider";
import { InfoCard } from "./infoCard";
import { InfoCircleXs } from "components/icons";
import Link from "next/link";
import { PrimaryButtonFull } from "components/buttons";
import ReactTooltip from "react-tooltip";
import { UserInfo } from "components/user";
import { UserSettingsContext } from "contexts/userSettings";
import { categoryList } from "constants/listings";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

const ListingDetails = (props: IlistingDetails): JSX.Element => {
  const [session] = useSession();
  const [submitting, setSubmitting] = useState(false);
  const { userSettings, assignUserSettings } = useContext(UserSettingsContext);
  const router = useRouter();
  const isSeller = session?.accountId == props.seller.id;
  const editable =
    props.aasm_state === "draft" || props.aasm_state === "active";
  const sold = props.aasm_state === "sold" || props.aasm_state === "refunded";
  const category = categoryList.find((c) => c.value == props.category);
  const subCategory = category?.subCategory.find(
    (s) => s.value == props.subcategory
  );
  const cantShipToYou = props.shipping == null;

  const renderShipping = () => {
    if (cantShipToYou) {
      return (
        <div className="text-sm font-semibold leading-none text-error">
          {"Doesn't ship to your location"}
        </div>
      );
    } else if (props.shipping == 0) {
      return (
        <div className="text-sm font-semibold leading-none text-success">
          + Free Shipping
        </div>
      );
    }
    return (
      <div className="text-sm leading-none text-accent-dark">
        +
        {Number(props.shipping).toLocaleString("en", {
          style: "currency",
          currency: "usd",
        })}{" "}
        Shipping
      </div>
    );
  };

  const renderCombinedShipping = () => {
    if (props.combined_shipping == null) {
      return <div className=" text-accent-darker">None</div>;
    } else if (Number(props.combined_shipping) == 0) {
      return <div className="text-accent-darker">Free</div>;
    }
    return (
      <div className="text-accent-darker">
        {Number(props.combined_shipping).toLocaleString("en", {
          style: "currency",
          currency: "usd",
        })}
      </div>
    );
  };

  async function addItem() {
    setSubmitting(true);
    CartApi(session?.accessToken)
      .addItem(`${props.seller.id}`, `${props.id}`)
      .then(() => {
        toast.success("Item added to cart");
        assignUserSettings({ ...userSettings, has_cart: true });
      })
      .catch((error) => {
        toast.error(JSON.stringify(error.response.data));
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  function renderButton() {
    if (sold)
      return (
        <PrimaryButtonFull text="This item has sold" disabled={true} href="#" />
      );
    if (!editable)
      return (
        <PrimaryButtonFull
          text="This item is not available"
          disabled={true}
          href="#"
        />
      );
    if (!session)
      return (
        <PrimaryButtonFull
          text="Log in to purchase"
          href={`/login?redirect=${router.asPath}`}
        />
      );
    else if (isSeller) {
      return (
        <SecondaryButtonFull
          href={`/listings/${props.id}/edit`}
          text="Update Listing"
        />
      );
    } else if (cantShipToYou) {
      return (
        <PrimaryButtonFull
          text="Doesn't ship to your location"
          href="#"
          disabled={true}
        />
      );
    }
    return (
      <div data-tip data-for="add-to-cart">
        <SubmitButtonFull
          text="Add to Cart"
          disabled={!userSettings.address_set}
          submitting={submitting}
          onClick={addItem}
        />
        <ReactTooltip
          id="add-to-cart"
          type="dark"
          place="top"
          multiline={true}
          effect="solid"
          disable={userSettings.address_set}
        >
          <div className="text-center">
            You need to set your address
            <br />
            before making purchases
          </div>
        </ReactTooltip>
      </div>
    );
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
            {renderShipping()}
          </div>
          <div className="my-4">{renderButton()}</div>
          <div className="grid grid-cols-1 my-4 space-y-4 sm:grid-cols-2">
            <div className="mt-4">
              <label className="font-semibold text-accent-darker">
                Category
              </label>
              <div>
                <Link
                  href={`/listings/search?destination_country=${userSettings.country}&category=${props.category}&sort=newest`}
                >
                  <a className="underline text-info hover:text-primary">
                    {category?.text}
                  </a>
                </Link>
              </div>
            </div>
            <div>
              <label className="font-semibold text-accent-darker">
                Sub-Category
              </label>
              <div>
                <Link
                  href={`/listings/search?destination_country=${userSettings.country}&category=${props.category}&subcategory=${props.subcategory}&sort=newest`}
                >
                  <a className="underline text-info hover:text-primary">
                    {subCategory?.text}
                  </a>
                </Link>
              </div>
            </div>

            <div>
              <label className="font-semibold text-accent-darker">
                Condition{" "}
                <Link href="https://support.skwirl.io/kb/en/article/what-are-the-condition-guidelines">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-info hover:text-primary"
                  >
                    (Guide)
                  </a>
                </Link>
              </label>
              <div>
                <ConditionPill
                  grading_company={props.grading_company}
                  condition={props.condition}
                  category={props.category}
                />
              </div>
            </div>
            <div>
              <label className="flex font-semibold text-accent-darker">
                Combined Shipping
                <span
                  data-tip
                  data-for="combined-shipping"
                  className="text-center"
                >
                  <InfoCircleXs />
                  <ReactTooltip
                    id="combined-shipping"
                    type="dark"
                    wrapper="span"
                    multiline={true}
                    place="top"
                    effect="solid"
                  >
                    The shipping cost if combined <br />
                    with other items from this seller
                  </ReactTooltip>
                </span>
              </label>
              {renderCombinedShipping()}
            </div>
          </div>
          <div className="my-8"></div>
          <h5>Seller Information</h5>
          <Link href={`/users/${props.seller.id}`}>
            <a>
              <UserInfo {...props.seller} />
            </a>
          </Link>
        </InfoCard>
      </div>
      <InfoCard>
        <h4 className="pb-2 text-center border-b">Description</h4>
        <div className="pt-4 whitespace-pre">{props.description}</div>
      </InfoCard>
    </div>
  );
};

export default ListingDetails;
