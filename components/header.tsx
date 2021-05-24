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

function LoggedOutNav() {
  return (
    <div className="lg:flex-row lg:ml-auto lg:w-auto lg:items-center items-start flex flex-col lg:h-auto">
      <Link href="/login">
        <a className="lg:block lg:w-auto w-full px-3 py-2 rounded text-white hover:bg-red-700 hover:text-white">
          <UserCircleIcon className="h-8 w-8" />
          <span className="text-xs font-bold">Login</span>
        </a>
      </Link>
    </div>
  );
}

export default function Header() {
  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(!active);
  };
  const [session, loading] = useSession();

  function LoggedInNav() {
    return (
      <div className="lg:flex-row lg:ml-auto lg:w-auto lg:items-center items-start flex flex-col lg:h-auto">
        <Link href="listings/new">
          <a className="lg:block lg:w-auto w-full px-3 py-2 rounded text-white hover:bg-red-700 hover:text-white">
            <CurrencyDollarIcon className="h-8 w-8" />
            <span className="text-xs font-bold">Sell stuff</span>
          </a>
        </Link>
        <Link href="/">
          <a className="lg:block lg:w-auto w-full px-3 py-2 rounded text-white hover:bg-red-700 hover:text-white">
            <ShoppingCartIcon className="h-8 w-8" />
            <span className="text-xs font-bold">Cart</span>
          </a>
        </Link>
        <Link href="/listings">
          <a className="lg:block lg:w-auto w-full px-3 py-2 rounded text-white hover:bg-red-700 hover:text-white">
            <UserCircleIcon className="h-8 w-8" />
            <span className="text-xs font-bold">{session?.user?.name}</span>
          </a>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Skwirly</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <nav className="flex flex-wrap items-center bg-red-900 p-3">
          <Link href="/">
            <a className="inline-flex p-2 mr-4 text-white">
              {/* Placeholder icon */}
              <FireIcon className="w-6 h-6" />
              <span className="text-xl font-bold uppercase tracking-wide">
                Swkirly
              </span>
            </a>
          </Link>
          <button
            className="inline-flex p-3 m-1 hover:bg-red-700 rounded lg:hidden text-white ml-auto hover:text-white"
            onClick={handleClick}
          >
            <MenuIcon className="w-6 h-6" />
          </button>
          <div
            className={`${
              active ? "" : "hidden"
            } w-full lg:inline-flex lg:flex-grow lg:w-auto`}
          >
            {session ? <LoggedInNav /> : <LoggedOutNav />}
          </div>
        </nav>
      </header>
    </div>
  );
}
