import {
  CircleIconXs,
  CurrencyDollarIcon,
  ShoppingCartIcon,
} from "components/icons";
import { Menu, Transition } from "@headlessui/react";

import { ChevronDownIconSm } from "components/icons";
import { DropDown } from "./dropdown";
import { Fragment } from "react";
import Head from "next/head";
import { IconLink } from "./iconLink";
import Link from "next/link";
import ReactTooltip from "react-tooltip";
import SearchForm from "components/forms/listing/search";
import { SkwirlIconMd } from "components/icons";
import { Spinner } from "components/spinner";
import { UserSettingsContext } from "contexts/userSettings";
import { categoryList } from "constants/listings";
import { useContext } from "react";
import { useSession } from "next-auth/react";

function CategoryPopovers() {
  const { userSettings } = useContext(UserSettingsContext);

  return (
    <div className="grid grid-cols-3 mx-auto justify-items-center">
      {categoryList.map((category) => {
        return (
          <Menu as="div" className="relative" key={category.value}>
            <Menu.Button className="flex items-center p-2 text-xs font-semibold rounded-md sm:text-sm focus:outline-none text-accent-dark">
              {category.text} <ChevronDownIconSm />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Menu.Items className="absolute z-10 focus:outline-none">
                <Menu.Item>
                  <div className="grid p-2 space-y-2 text-xs bg-white border rounded-md w-28 sm:w-48 sm:text-sm border-accent">
                    {category.subCategory.map((subCategory) => {
                      return (
                        <Link
                          key={subCategory.value}
                          href={`/listings/search?destination_country=${userSettings.country}&category=${category.value}&subcategory=${subCategory.value}&sort=newest`}
                        >
                          <a className="p-2 rounded-md text-accent-darker hover:bg-primary hover:text-white">
                            {subCategory.text}
                          </a>
                        </Link>
                      );
                    })}
                  </div>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        );
      })}
    </div>
  );
}

export default function Header(): JSX.Element {
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
      <Head>
        <title>Skwirl</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header className="bg-primary">
        <nav className="flex items-center px-2 mx-auto max-w-screen-2xl">
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
        </nav>

        <div className="w-full bg-white border-t border-b">
          <div className="container max-w-6xl mx-auto">
            <CategoryPopovers />
          </div>
        </div>
      </header>
    </>
  );
}
