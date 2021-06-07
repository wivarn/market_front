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
import useSWR from "swr";
import { useSession } from "next-auth/client";

export default function Header() {
  const [session, loading] = useSession();

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

  const { profile, isLoading, isError } = getProfile();

  function renderNav() {
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
    if (isLoading) return <div>Spinner</div>;
    return (
      <>
        <div className="grid items-center grid-flow-col space-x-10 justify-items-center auto-cols-max">
          <IconLink
            href="/listings"
            icon={<CurrencyDollarIcon />}
            text="Sell"
          />
          <IconLink href="/" icon={<ShoppingCartIcon />} text="Cart" />
          <DropDown name={profile.data.given_name}></DropDown>
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
        <nav className="flex flex-wrap items-center px-4 py-2">
          <Link href="/">
            <a className="p-2 text-primary">
              <h1 className="inline-flex">
                <SquirrelIcon />
                Skwirl
              </h1>
            </a>
          </Link>
          <div className="ml-auto">{renderNav()}</div>
        </nav>
      </header>
    </div>
  );
}
