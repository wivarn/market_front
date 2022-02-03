import {
  CircleIconXs,
  CurrencyDollarIcon,
  ShoppingCartIcon,
} from "components/icons";

import { DropDown } from "./dropdown";
import { IconLink } from "./iconLink";
import Link from "next/link";
import ReactTooltip from "react-tooltip";
import SearchForm from "components/forms/listing/search";
import { SkwirlIconMd } from "components/icons";
import { Spinner } from "components/spinner";
import { UserSettingsContext } from "contexts/userSettings";
import { useContext } from "react";
import { useSession } from "next-auth/react";

export default function Navbar(): JSX.Element {
  const { data: session, status } = useSession();
  const sessionLoading = status === "loading";
  const { userSettings } = useContext(UserSettingsContext);

  function renderNav() {
    if (sessionLoading) return <Spinner />;
    return session ? <LoggedInNav /> : <LoggedOutNav />;
  }

  function LoggedOutNav() {
    return (
      <div className="w-12 space-x-4 sm:w-32 justify-items-right">
        <Link href="/login">
          <a className="text-sm font-semibold text-primary-lightest hover:text-primary-lighter">
            Log in
          </a>
        </Link>
        <span className="hidden text-white sm:inline-block">/</span>
        <Link href="/account/new">
          <a className="hidden text-sm font-semibold text-primary-lightest sm:inline-block hover:text-primary-lighter">
            Sign up
          </a>
        </Link>
      </div>
    );
  }

  function LoggedInNav() {
    function sellLink() {
      const href = userSettings.selling_enabled
        ? "/listings?state=active&sort=newest"
        : "/apply";
      return (
        <div data-tip data-for="sell">
          <IconLink href={href} icon={<CurrencyDollarIcon />} />
          <ReactTooltip id="sell" type="dark" place="bottom" effect="solid">
            Listings
          </ReactTooltip>
        </div>
      );
    }

    function cartDot() {
      if (!userSettings.cart_items.length) return null;
      return (
        <span className="absolute top-0 right-0 text-info-darker">
          <CircleIconXs />
        </span>
      );
    }

    return (
      <>
        <div className="items-center hidden mr-8 space-x-4 justify-items-center md:inline-flex">
          {sellLink()}
          <div data-tip data-for="cart" className="relative">
            <IconLink href="/cart" icon={<ShoppingCartIcon />} />
            {cartDot()}
            <ReactTooltip id="cart" type="dark" place="bottom" effect="solid">
              Cart
            </ReactTooltip>
          </div>
          <DropDown />
        </div>
        <div className="inline-flex items-center md:hidden">
          <DropDown />
        </div>
      </>
    );
  }

  return (
    <>
      <Link href="/">
        <a>
          <span className="inline-flex fill-current text-primary-lightest">
            <SkwirlIconMd />
            <h2 className="hidden mt-2 font-bold md:block">skwirl</h2>
          </span>
        </a>
      </Link>
      <span className="w-full px-2 mx-auto">
        <SearchForm />
      </span>
      <div className="ml-auto">{renderNav()}</div>
    </>
  );
}
