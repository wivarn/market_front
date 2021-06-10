import {
  CurrencyDollarIcon,
  ShoppingCartIcon,
  SquirrelIcon,
  UserCircleIcon,
} from "components/icons";

import { DropDown } from "./dropdown";
import Head from "next/head";
import { IconLink } from "./iconLink";
import Link from "next/link";
import SearchForm from "components/forms/search"
import useSWR from "swr";
import { useSession } from "next-auth/client";

export default function Header() {
  const [session, sessionLoading] = useSession();

  function getProfile() {
    const { data, error } = useSWR(
      session ? ["account/profile", session.accessToken] : null,
      {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      }
    );

    return {
      profile: data,
      isLoading: !error && !data,
      isError: error,
    };
  }

  const { profile } = getProfile();

  function renderNav() {
    if (sessionLoading) return <div>Spinner</div>;
    return session ? <LoggedInNav /> : <LoggedOutNav />;
  }

  function LoggedOutNav() {
    return (
      <div className="pr-3">
        <IconLink href="/login" icon={<UserCircleIcon />} text="Log In" />
      </div>
    );
  }

  function LoggedInNav() {
    return (
      <>
        <div className="grid items-center grid-flow-col space-x-10 justify-items-center auto-cols-max">
          <IconLink
            href="/listings"
            icon={<CurrencyDollarIcon />}
            text="Sell"
          />
          <IconLink href="/" icon={<ShoppingCartIcon />} text="Cart" />
          <DropDown name={profile ? profile.data.given_name : "..."}></DropDown>
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
      <header>
        <nav className="container flex flex-wrap items-center px-4 py-2 mx-auto max-w-screen-2xl">
          <Link href="/">
            <a className="p-2 text-primary">
              <div className="inline-flex">
                <SquirrelIcon />
                <h1 className="px-2 py-1">Skwirl</h1>
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
