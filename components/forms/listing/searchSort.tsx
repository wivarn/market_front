import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { SmChevronDownIcon, XsSortIcon } from "components/icons";

import { useRouter } from "next/router";

const sortOptions = [
  { id: "", text: "Best Match (default)" },
  { id: "priceLow", text: "Price (low to high)" },
  { id: "priceHigh", text: "Price (high to low)" },
  { id: "priceShipLow", text: "Price + Shipping (low to high)" },
  { id: "priceShipHigh", text: "Price + Shipping (high to low)" },
  { id: "newest", text: "Newest" },
  { id: "oldest", text: "Oldest" },
];

export default function SearchSort(): JSX.Element {
  const router = useRouter();

  let initialSelected = sortOptions[0];
  const params = new URLSearchParams(router.asPath.split("?")[1]);
  initialSelected =
    sortOptions.find((option) => option.id == params.get("sort")) ||
    sortOptions[0];

  const [selected, setSelected] = useState(initialSelected);

  return (
    <div className="relative md:w-72">
      <Listbox value={selected} onChange={setSelected}>
        <div>
          <Listbox.Button className="relative p-2 text-left bg-white border rounded-md md:w-72 border-accent">
            <span className="hidden truncate md:block">{selected.text}</span>
            <span className="absolute inset-y-0 right-0 items-center hidden pr-2 md:flex">
              <SmChevronDownIcon />
            </span>
            <span className="block md:hidden">
              <XsSortIcon />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute right-0 z-10 px-2 py-2 my-2 text-sm bg-white border rounded-md shadow-lg md:left-0 md:w-full md:text-base border-accent">
              {sortOptions.map((option, optionId) => (
                <Listbox.Option
                  key={optionId}
                  className={({ active }) =>
                    `${
                      active
                        ? "text-white bg-primary rounded-md font-semibold"
                        : "text-accent-darker"
                    }
                          cursor-default select-none relative py-2 px-2`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`${
                          selected ? "font-semibold" : "font-normal"
                        } block truncate`}
                        onClick={() => {
                          router.push({
                            pathname: router.pathname,
                            query: { ...router.query, ...{ sort: option.id } },
                          });
                        }}
                      >
                        {option.text}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
