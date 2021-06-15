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
import SearchForm from "components/forms/search";
import useSWR from "swr";
import { signOut, useSession } from "next-auth/client";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Header() {
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
      <div className="inline-flex items-center">
        <IconLink href="/login" icon={<UserCircleIcon />} text="Log In" />
      </div>
    );
  }

  function LoggedInNav() {
    return (
      <>
        <div className="items-center hidden space-x-8 md:inline-flex">
          <IconLink
            href="/listings?status=active"
            icon={<CurrencyDollarIcon />}
            text="Sell"
          />
          <IconLink href="/" icon={<ShoppingCartIcon />} text="Cart" />
          <DropDown name={profile ? profile.data.given_name : "..."}></DropDown>
        </div>
        <div className="inline-flex items-center md:hidden">
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
      <header className="border-b border-accent-light">
        <nav className="container flex items-center px-2 mx-auto max-w-screen-2xl">
          <Link href="/">
            <a className="pr-1 text-primary">
              <div className="inline-flex">
                <SquirrelIcon />
                <h1 className="hidden px-2 py-1 md:block">Skwirl</h1>
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
