import {
  CurrencyDollarIcon,
  ShoppingCartIcon,
  SquirrelIcon,
  UserCircleIcon,
} from "components/icons";

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
        <IconLink href="/login" icon={<UserCircleIcon />} text="Login" />
      </div>
    );
  }

  function LoggedInNav() {
    return (
      <>
        <div className="grid grid-flow-col justify-items-center auto-cols-max items-center space-x-10 pr-3">
          <IconLink
            href="/listings/new"
            icon={<CurrencyDollarIcon />}
            text="Sell"
          />
          <IconLink href="/" icon={<ShoppingCartIcon />} text="Cart" />
          <IconLink
            href="/listings"
            icon={<UserCircleIcon />}
            text={session?.user?.name || ""}
          />
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
        <nav className="flex flex-wrap items-center bg-primary py-2 px-3">
          <Link href="/">
            <a className="p-2 mr-4 text-accent-light">
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
