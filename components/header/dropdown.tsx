import { Fragment, LegacyRef, forwardRef } from "react";
import { Menu, Transition } from "@headlessui/react";
import { MenuIcon, UserChevronIcon } from "components/icons";
import { signOut, useSession } from "next-auth/client";

import { AuthApi } from "services/backendApi/auth";
import { IconLink } from "./iconLink";
import Link from "next/link";
import { useRouter } from "next/router";

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
            active
              ? "bg-info-darker text-accent-lightest"
              : "text-accent-darker",
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
LinkWrapper.displayName = "linkWrapper";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const DropDown = (): JSX.Element => {
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
              <IconLink icon={<UserChevronIcon />} tooltip="Account" />
            </Menu.Button>
            <Menu.Button className="py-2 md:hidden focus:outline-none">
              <IconLink icon={<MenuIcon />} tooltip="Menu" />
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
            <Menu.Items className="absolute z-50 w-screen text-center bg-accent-lightest -right-2 md:text-left md:mt-2 md:w-48 md:shadow-md md:rounded-md md:px-2 ring-1 ring-info-darker focus:outline-none">
              <div className="py-2 divide-info-lightest">
                <Menu.Item>
                  {({ active }) => (
                    <LinkWrapper href="/account/profile" active={active}>
                      Profile
                    </LinkWrapper>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <LinkWrapper href="/" active={active}>
                      Cart
                    </LinkWrapper>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <LinkWrapper href="/listings?status=active" active={active}>
                      Selling
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
