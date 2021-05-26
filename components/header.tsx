import {
  CurrencyDollarIcon,
  MenuIcon,
  ShoppingCartIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";

import { FireIcon } from "@heroicons/react/solid";
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/client";
import { useState } from "react";

export default function Header() {
  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(!active);
  };
  const [session, loading] = useSession();

  function renderNav() {
    if (loading) return <></>;
    return session ? <LoggedInNav /> : <LoggedOutNav />;
  }

  function LoggedOutNav() {
    return (
      <>
        <Link href="/login">
          <a className="md:block md:w-auto w-full px-3 py-2 rounded text-white hover:bg-blue-700 hover:text-white">
            <UserCircleIcon className="h-8 w-8" />
            <span className="text-xs font-bold">Login</span>
          </a>
        </Link>
      </>
    );
  }

  function LoggedInNav() {
    return (
      <>
          <Link href="/listings/new">
            <a className="md:block md:w-auto w-full px-3 py-2 rounded text-white hover:bg-blue-700 hover:text-white">
              <CurrencyDollarIcon className="h-8 w-8" />
              <span className="text-xs font-semibold">Sell stuff</span>
            </a>
          </Link>
          <Link href="/">
            <a className="md:block md:w-auto w-full px-3 py-2 rounded text-white hover:bg-blue-700 hover:text-white">
              <ShoppingCartIcon className="h-8 w-8" />
              <span className="text-xs font-semibold">Cart</span>
            </a>
          </Link>
          <Link href="/listings">
            <a className="md:block md:w-auto w-full px-3 py-2 rounded text-white hover:bg-blue-700 hover:text-white">
              <UserCircleIcon className="h-8 w-8" />
              <span className="text-xs font-semibold">{session?.user?.name}</span>
            </a>
          </Link>
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
        <nav className="flex flex-wrap items-center bg-blue-900 p-3">
          <Link href="/">
            <a className="p-2 mr-4 text-white">
              <span className="inline-flex text-2xl font-bold tracking-wide">
                {/* Placeholder icon */}
                <FireIcon className="w-8 h-8" />
                Skwirl
              </span>
            </a>
          </Link>
          <button
            className="inline-flex p-2 m-1 hover:bg-blue-700 rounded md:hidden text-white ml-auto hover:text-white"
            onClick={handleClick}
          >
            <MenuIcon className="w-6 h-6" />
          </button>
          <div
            className={`${
              active ? "" : "hidden"
            } w-full md:inline-flex md:flex-grow md:w-auto`}
          >
            <div className="md:flex-row md:ml-auto md:w-auto md:items-center items-start flex flex-col md:h-auto">
              {renderNav()}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
