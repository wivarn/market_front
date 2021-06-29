import {
  CurrencyDollarIcon,
  LgSquirrelIcon,
  ShoppingCartIcon,
  UserCircleIcon,
} from "components/icons";
import { signOut, useSession } from "next-auth/client";

import { DropDown } from "./dropdown";
import Head from "next/head";
import { IconLink } from "./iconLink";
import Link from "next/link";
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
    if (session?.error === "RefreshAccessTokenError") {
      signOut({ redirect: false, callbackUrl: "/" }).then(async () => {
        router.push("/");
      });
    }
  }, [session]);

  function renderNav() {
    if (sessionLoading)
      return (
        <div className="text-accent-lightest">
          <Spinner />
        </div>
      );
    return session ? <LoggedInNav /> : <LoggedOutNav />;
  }

  function LoggedOutNav() {
    return (
      <div className="inline-flex items-center justify-items-center">
        <IconLink href="/login" icon={<UserCircleIcon />} tooltip="Log In" />
      </div>
    );
  }

  function LoggedInNav() {
    return (
      <>
        <div className="items-center hidden mr-8 space-x-4 justify-items-center md:inline-flex">
          <IconLink
            href="/listings?status=active"
            icon={<CurrencyDollarIcon />}
            tooltip="Sell"
          />
          <IconLink href="/cart" icon={<ShoppingCartIcon />} tooltip="Cart" />
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
        <title>Skwirl</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header className="bg-info-darker">
        <nav className="container flex items-center px-2 mx-auto max-w-screen-2xl">
          <Link href="/">
            <a className="pr-1 text-accent-lightest">
              <div className="inline-flex">
                <LgSquirrelIcon />
                <h2 className="hidden px-2 py-1 text-accent-lightest md:block">
                  Skwirl
                </h2>
              </div>
            </a>
          </Link>
          <SearchForm />
          <div className="ml-auto">{renderNav()}</div>
        </nav>
      </header>
    </div>
  );
}
