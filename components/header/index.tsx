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
import { useSession } from "next-auth/client";

export default function Header() {
  const [session, loading] = useSession();

  function renderNav() {
    if (loading) return <></>;
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
            href="/listings/new"
            icon={<CurrencyDollarIcon />}
            text="Sell"
          />
          <IconLink href="/" icon={<ShoppingCartIcon />} text="Cart" />
          <DropDown name={session?.user?.name}></DropDown>
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
        <nav className="flex flex-wrap items-center px-2 py-2">
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
