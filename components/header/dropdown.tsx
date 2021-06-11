import { Fragment, LegacyRef, forwardRef } from "react";
import { Menu, Transition } from "@headlessui/react";
import { MenuIcon, UserCircleIcon } from "components/icons";
import { signOut, useSession } from "next-auth/client";

import { AuthApi } from "services/backendApi/auth";
import { IconLink } from "./iconLink";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  name?: string;
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  active: boolean;
}

const LinkWrapper = forwardRef(
  (
    { href, active, ...props }: LinkProps,
    ref: LegacyRef<HTMLAnchorElement>
  ) => {
    return (
      <Link href={href}>
        <a
          ref={ref}
          className={classNames(
            active ? "bg-primary text-accent-lightest" : "text-accent-darkest",
            "block md:px-4 py-2 text-sm font-medium md:rounded-md"
          )}
          {...props}
        >
          {props.children}
        </a>
      </Link>
    );
  }
);

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const DropDown = (props: Props) => {
  const [session] = useSession();
  const router = useRouter();

  async function signOutAndRedirect() {
    signOut({ redirect: false, callbackUrl: "/" }).then(async (_) => {
      if (_) {
        router.push("/");

        session &&
          AuthApi(session.accessToken)
            .logout()
            .catch((error) => {
              alert(error);
            });
      }
    });
  }

  return (
    <Menu as="span" className="relative">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="hidden py-2 md:block focus:outline-none">
              <IconLink icon={<UserCircleIcon />} text={props.name} />
            </Menu.Button>
            <Menu.Button className="py-2 md:hidden focus:outline-none">
              <IconLink icon={<MenuIcon />} text="" />
            </Menu.Button>
          </div>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-50 w-screen p-1 mt-1 text-center bg-white divide-y md:text-left md:mt-2 md:w-48 md:shadow-md md:rounded-md ring-1 ring-accent focus:outline-none divide-accent">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <LinkWrapper href="/" active={active}>
                      Your Cart
                    </LinkWrapper>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <LinkWrapper href="/listings" active={active}>
                      Your Listings
                    </LinkWrapper>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <LinkWrapper href="/account/profile" active={active}>
                      User Profile
                    </LinkWrapper>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <LinkWrapper
                      href=""
                      active={active}
                      onClick={signOutAndRedirect}
                    >
                      Log Out
                    </LinkWrapper>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};
