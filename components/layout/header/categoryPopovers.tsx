import { Menu, Transition } from "@headlessui/react";

import { ChevronDownIconSm } from "components/icons";
import { Fragment } from "react";
import Link from "next/link";
import { UserSettingsContext } from "contexts/userSettings";
import { categoryList } from "constants/listings";
import { useContext } from "react";

export default function CategoryPopovers(): JSX.Element {
  const { userSettings } = useContext(UserSettingsContext);

  return (
    <div className="grid grid-cols-3 mx-auto justify-items-center">
      {categoryList.map((category) => {
        return (
          <Menu as="div" className="relative" key={category.value}>
            <Menu.Button className="flex items-center p-2 text-xs font-semibold rounded-md sm:text-sm focus:outline-none text-accent-dark">
              {category.text} <ChevronDownIconSm />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Menu.Items className="absolute z-10 focus:outline-none">
                <Menu.Item>
                  <div className="grid p-2 space-y-2 text-xs bg-white border rounded-md w-28 sm:w-48 sm:text-sm border-accent">
                    {category.subCategory.map((subCategory) => {
                      return (
                        <Link
                          key={subCategory.value}
                          href={`/listings/search?destination_country=${userSettings.country}&category=${category.value}&subcategory=${subCategory.value}&sort=newest`}
                        >
                          <a className="p-2 rounded-md text-accent-darker hover:bg-primary hover:text-white">
                            {subCategory.text}
                          </a>
                        </Link>
                      );
                    })}
                  </div>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        );
      })}
    </div>
  );
}
