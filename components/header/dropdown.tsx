import { Fragment, LegacyRef, forwardRef } from "react";
import { Menu, Transition } from "@headlessui/react";
import { signOut, useSession } from "next-auth/client";

import { IconLink } from "./iconLink";
import Link from "next/link";
import { UserCircleIcon } from "components/icons";
import api from "services/api";
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
            active ? "bg-accent-light text-primary-light" : "text-primary",
            "block px-4 py-2 text-sm font-semibold"
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
    router.push("/");
    signOut({ redirect: false });

    await api.post(
      "/logout",
      {},
      {
        headers: { Authorization: `Bearer ${session?.accessToken}` },
      }
    );
  }

  return (
    <Menu as="span" className="relative">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="focus:outline-none">
              <IconLink icon={<UserCircleIcon />} text={props.name} />
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
            <Menu.Items className="absolute right-0 mt-2 bg-white rounded-md shadow-md w-max ring-1 ring-primary focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <LinkWrapper href="/listings" active={active}>
                      Your Listings
                    </LinkWrapper>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <LinkWrapper href="/profile" active={active}>
                      Profile
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
