import {
  CurrencyDollarIcon,
  ShoppingCartIcon,
  UserCircleIcon,
} from "components/icons";

import { ChevronDownIconSm } from "components/icons";
import { DropDown } from "./dropdown";
import Head from "next/head";
import { IconLink } from "./iconLink";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import ReactTooltip from "react-tooltip";
import SearchForm from "components/forms/listing/search";
import { SkwirlIconMd } from "components/icons";
import { Spinner } from "components/spinner";
import { categoryList } from "constants/listings";
import { useSession } from "next-auth/client";

function CategoryPopovers() {
  return (
    <div className="grid grid-cols-3 mx-auto justify-items-center">
      {categoryList.map((category) => {
        return (
          <Popover key={category.value} className="relative">
            <Popover.Button className="flex items-center p-2 text-sm font-semibold rounded-md focus:outline-none text-accent-dark">
              {category.text} <ChevronDownIconSm />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10">
                <div className="grid w-48 p-2 space-y-2 text-sm bg-white border rounded-md border-accent">
                  {category.subCategory.map((subCategory) => {
                    return (
                      <Link
                        key={subCategory.value}
                        href={`/listings/search?category=${category.value}&subcategory=${subCategory.value}`}
                      >
                        <a className="p-2 rounded-md text-accent-darker hover:bg-primary hover:text-white">
                          {subCategory.text}
                        </a>
                      </Link>
                    );
                  })}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        );
      })}
    </div>
  );
}

export default function Header(): JSX.Element {
  const [session, sessionLoading] = useSession();

  function renderNav() {
    if (sessionLoading) return <Spinner />;
    return session ? <LoggedInNav /> : <LoggedOutNav />;
  }

  function LoggedOutNav() {
    return (
      <div
        data-tip
        data-for="login"
        className="items-center justify-items-right"
      >
        <IconLink href="/login" icon={<UserCircleIcon />} />
        <ReactTooltip id="login" type="dark" place="bottom" effect="solid">
          Login
        </ReactTooltip>
      </div>
    );
  }

  function LoggedInNav() {
    return (
      <>
        <div className="items-center hidden mr-8 space-x-4 justify-items-center md:inline-flex">
          <div data-tip data-for="sell">
            <IconLink
              href="/listings?state=active"
              icon={<CurrencyDollarIcon />}
            />
            <ReactTooltip id="sell" type="dark" place="bottom" effect="solid">
              Sell
            </ReactTooltip>
          </div>
          <div data-tip data-for="cart">
            <IconLink href="/cart" icon={<ShoppingCartIcon />} />
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
    <div className="">
      <Head>
        <title>skwirl</title>
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
    </div>
  );
}
