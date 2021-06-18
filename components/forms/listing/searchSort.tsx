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
  const [selected, setSelected] = useState(sortOptions[0]);
  const router = useRouter();

  return (
    <div className="">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
            <span className="block truncate">{selected.text}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SmChevronDownIcon />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {sortOptions.map((option, optionId) => (
                <Listbox.Option
                  key={optionId}
                  className={({ active }) =>
                    `${active ? "text-amber-900 bg-amber-100" : "text-gray-900"}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  value={option}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? "font-medium" : "font-normal"
                        } block truncate`}
                        onClick={() => {
                          console.log("clicked");
                          router.push({
                            pathname: "/listings/search",
                            query: { ...router.query, ...{ sort: option.id } },
                          });
                        }}
                      >
                        {option.text}
                      </span>
                      {/* {selected ? (
                        <span
                          className={`${
                            active ? "text-amber-600" : "text-amber-600"
                          }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null} */}
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
