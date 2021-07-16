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
import ReactTooltip from "react-tooltip";
import SearchForm from "components/forms/listing/search";
import { Spinner } from "components/spinner";
import { useEffect } from "react";
import { useRouter } from "next/router";

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
              href="/listings?status=active"
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
      </header>
    </div>
  );
}
