import { Menu, Transition } from "@headlessui/react";

import { ChevronDownIconSm } from "components/icons";
import { Fragment } from "react";

interface IProps {
  disabled?: boolean;
  menuItemsClassName?: string;
  menutItems: JSX.Element[];
}

export const OverflowMenuJsx = (props: IProps): JSX.Element => {
  return (
    <Menu as="span" className="relative">
      {({ open }) => (
        <>
          <div>
            <Menu.Button
              className="inline-flex items-center gap-2 px-2 py-1 text-sm text-black bg-white border rounded-md disabled:cursor-not-allowed disabled:border-accent-light disabled:text-accent border-accent focus:outline-none hover:text-primary"
              disabled={props.disabled}
            >
              Respond <ChevronDownIconSm />
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
            <Menu.Items
              className={`absolute mt-1 z-50 px-2 text-left bg-white rounded-md shadow-md w-44 ring-1 ring-accent focus:outline-none ${props.menuItemsClassName}`}
            >
              <div className="py-2">
                {props.menutItems.map((item, index) => {
                  return (
                    <Menu.Item key={index}>
                      {({ active }) => (
                        <span
                          className={`block px-4 py-2 text-sm font-semibold rounded-md cursor-pointer ${
                            active
                              ? "bg-primary text-white"
                              : "text-accent-darker"
                          }`}
                        >
                          {item}
                        </span>
                      )}
                    </Menu.Item>
                  );
                })}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};
