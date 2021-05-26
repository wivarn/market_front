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
        <div className="grid grid-flow-col justify-items-center auto-cols-max items-center space-x-4">
          <Link href="/listings/new">
            <a className="px-3 py-2 rounded text-white hover:text-blue-200 text-center">
              <CurrencyDollarIcon className="h-8 w-8" />
              <div className="text-xs font-semibold">Sell</div>
            </a>
          </Link>
          <Link href="/">
            <a className="px-3 py-2 rounded text-white hover:text-blue-200 text-center">
              <ShoppingCartIcon className="h-8 w-8" />
              <div className="text-xs font-semibold">Cart</div>
            </a>
          </Link>
          <Link href="/listings">
            <a className="px-3 py-2 rounded text-white hover:text-blue-200 text-center">
              <UserCircleIcon className="h-8 w-8" />
              <div className="text-xs font-semibold">{session?.user?.name}
              </div>
            </a>
          </Link>
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
        <nav className="flex flex-wrap items-center bg-blue-900 py-2 px-3">
          <Link href="/">
            <a className="p-2 mr-4 text-white">
              <h1 className="inline-flex">
                {/* Placeholder icon */}
                <FireIcon className="w-10 h-10" />
                Skwirl
              </h1>
            </a>
          </Link>
            <div className="ml-auto">
              {renderNav()}
            </div>
        </nav>
      </header>
    </div>
  );
}
