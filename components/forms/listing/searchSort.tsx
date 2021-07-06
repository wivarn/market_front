import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

import { SmChevronDownIcon } from "components/icons";
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
    <div className="w-72">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative my-2">
          <Listbox.Button className="relative w-full py-2 pl-3 text-sm text-left bg-white border rounded-md cursor-default md:text-base border-accent">
            <span className="block truncate">{selected.text}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2">
              <SmChevronDownIcon />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 w-full px-2 py-1 mt-1 overflow-auto text-sm bg-white border rounded-md shadow-lg md:text-base max-h-72 border-accent">
              {sortOptions.map((option, optionId) => (
                <Listbox.Option
                  key={optionId}
                  className={({ active }) =>
                    `${
                      active
                        ? "text-accent-lightest bg-accent-darker rounded-md font-semibold"
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
