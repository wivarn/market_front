import {
  CurrencyDollarIcon,
  ShoppingCartIcon,
  UserCircleIcon,
} from "components/icons";
import { signOut, useSession } from "next-auth/client";

import { DropDown } from "./dropdown";
import Head from "next/head";
import { IconLink } from "./iconLink";
import Link from "next/link";
import { MdSkwirlIcon } from "components/icons";
import PageContainer from "components/pageContainer";
import { Popover } from "@headlessui/react";
import ReactTooltip from "react-tooltip";
import SearchForm from "components/forms/listing/search";
import { SmChevronDownIcon } from "components/icons";
import { Spinner } from "components/spinner";
import { categoryList } from "constants/listings";
import { useEffect } from "react";
import { useRouter } from "next/router";

const popoverPanelClass =
  "grid p-2 text-sm w-56 space-y-2 bg-white border border-accent rounded-md";
const popoverButtonClass =
  "focus:outline-none text-sm items-center flex font-semibold p-2 rounded-md text-accent-dark";
const popoverLinkClass =
  "p-2 text-accent-darker rounded-md hover:bg-primary hover:text-white";

function CategoryPopovers() {
  return (
    <div className="grid grid-cols-3 mx-auto justify-items-center">
      {categoryList.map((category) => {
        return (
          <Popover key={category.value} className="relative">
            <Popover.Button className={popoverButtonClass}>
              {category.text} <SmChevronDownIcon />
            </Popover.Button>

            <Popover.Panel className="absolute z-10">
              <div className={popoverPanelClass}>
                {category.subCategory.map((subCategory) => {
                  return (
                    <a
                      key={subCategory.value}
                      className={popoverLinkClass}
                      href={`/listings/search?category=SPORTS_CARDS&subcategory=${subCategory.value}`}
                    >
                      {subCategory.text}
                    </a>
                  );
                })}
              </div>
            </Popover.Panel>
          </Popover>
        );
      })}
    </div>
  );
}

export default function Header(): JSX.Element {
  const [session, sessionLoading] = useSession();
  const router = useRouter();

  // Might not be the best place to put this. Maybe we should have this in the layout or _app
  // page instead. It has be somewhere global or at least anywhere that could have a session.
  useEffect(() => {
    if (session?.error) {
      signOut({ redirect: false, callbackUrl: "/" }).then(async () => {
        router.push("/");
      });
    }
  }, [session]);

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
    <div>
      <Head>
        <title>skwirl</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <PageContainer yPadding="py-1">
          <nav className="flex items-center px-2">
            <Link href="/">
              <a>
                <span className="inline-flex fill-current text-primary">
                  <MdSkwirlIcon />
                  <h2 className="hidden px-2 mt-2 font-bold md:block">
                    skwirl
                  </h2>
                </span>
              </a>
            </Link>
            <span className="w-full px-2 mx-auto">
              <SearchForm />
            </span>
            <div className="ml-auto">{renderNav()}</div>
          </nav>
        </PageContainer>
        <div className="w-full mt-2 border-t border-b">
          <PageContainer yPadding="p-none">
            <CategoryPopovers />
          </PageContainer>
        </div>
      </header>
    </div>
  );
}
