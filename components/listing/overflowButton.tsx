import { Fragment, LegacyRef, forwardRef } from "react";
import { Menu, Transition } from "@headlessui/react";

import Link from "next/link";
import { SmOverflowIcon } from "components/icons";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  active: boolean;
}

export interface Props {
  disabled: boolean;
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
            active ? "bg-accent-darker text-white" : "text-accent-darker",
            "block px-4 py-2 text-sm font-semibold rounded-md"
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

export const OverflowButton = (props: Props): JSX.Element => {
  return (
    <Menu as="span" className="relative">
      {({ open }) => (
        <>
          <div>
            <Menu.Button
              className="inline-flex items-center gap-2 p-1 mt-1 border rounded-md border-accent hover:text-primary"
              disabled={props.disabled}
            >
              <SmOverflowIcon />
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
            <Menu.Items className="absolute right-0 z-50 w-48 px-2 text-left bg-white rounded-md shadow-md md:left-0 ring-1 ring-accent focus:outline-none">
              <div className="py-2">
                <Menu.Item>
                  {({ active }) => (
                    <LinkWrapper href="listings/bulkCreate" active={active}>
                      Bulk Listings
                    </LinkWrapper>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <LinkWrapper href="listings/template" active={active}>
                      Listing Template
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
