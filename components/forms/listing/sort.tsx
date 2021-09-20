import { ChevronDownIconSm, SortIconXs } from "components/icons";
import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

import { SpinnerXs } from "components/spinner";
import { useRouter } from "next/router";

export function ListingSort(): JSX.Element {
  const sortOptions = [
    { id: "newest", text: "Newest (default)" },
    { id: "oldest", text: "Oldest" },
    { id: "priceLow", text: "Price (low to high)" },
    { id: "priceHigh", text: "Price (high to low)" },
  ];

  return <_Sort sortOptions={sortOptions} />;
}

export function SearchSort(): JSX.Element {
  const sortOptions = [
    { id: "", text: "Best Match (default)" },
    { id: "priceLow", text: "Price (low to high)" },
    { id: "priceHigh", text: "Price (high to low)" },
    { id: "priceShipLow", text: "Price + Shipping (low to high)" },
    { id: "priceShipHigh", text: "Price + Shipping (high to low)" },
    { id: "newest", text: "Newest" },
    { id: "oldest", text: "Oldest" },
  ];

  return <_Sort sortOptions={sortOptions} />;
}

function _Sort({
  sortOptions,
}: {
  sortOptions: {
    id: string;
    text: string;
  }[];
}): JSX.Element {
  const router = useRouter();
  const [selected, setSelected] = useState(sortOptions[0]);

  useEffect(() => {
    if (!router.isReady) return;

    setSelected(
      sortOptions.find((option) => option.id == router.query.sort) ||
        sortOptions[0]
    );
  }, [router.isReady]);

  useEffect(() => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, ...{ sort: selected.id } },
    });
  }, [selected]);

  if (!router.isReady) return <SpinnerXs />;
  return (
    <div className="relative md:w-72">
      <Listbox value={selected} onChange={setSelected}>
        <div>
          <Listbox.Button className="relative p-2 text-left bg-white border rounded-md md:w-72 border-accent">
            <span className="hidden truncate md:block">{selected.text}</span>
            <span className="absolute inset-y-0 right-0 items-center hidden pr-2 md:flex">
              <ChevronDownIconSm />
            </span>
            <span className="block md:hidden">
              <SortIconXs />
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
