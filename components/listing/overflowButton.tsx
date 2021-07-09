import { SmOverflowIcon } from "components/icons";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, LegacyRef, forwardRef } from "react";
import { IconButton } from "components/iconButton";
import Link from "next/link";

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
            "block md:px-4 py-2 text-sm font-semibold md:rounded-md"
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
              className="py-2 focus:outline-none"
              disabled={props.disabled}
            >
              <IconButton icon={<SmOverflowIcon />} disabled={props.disabled} />
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
            <Menu.Items className="absolute z-50 w-48 px-2 text-left bg-white rounded-md shadow-md ring-1 ring-accent focus:outline-none">
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
