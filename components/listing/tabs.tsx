import Link from "next/link";
import { OverflowButton } from "components/listing/overflowButton";
import { PrimaryButton } from "components/buttons";
import React from "react";
import ReactTooltip from "react-tooltip";
import SearchFilter from "components/forms/listing/searchFilter";
import SearchSort from "components/forms/listing/searchSort";
import { SpinnerLg } from "components/spinner";
import useSWR from "swr";
import { useSession } from "next-auth/client";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  tab: string;
  activeTab: string;
}

const LinkWrapper = ({ href, tab, activeTab, ...props }: LinkProps) => {
  return (
    <Link href={href}>
      <a {...props}>
        <p
          className={
            tab == activeTab
              ? "pb-2 border-b-2 border-primary text-primary font-semibold"
              : ""
          }
        >
          {props.children}
        </p>
      </a>
    </Link>
  );
};

export default function ListingTabs({
  activeTab,
  children,
}: {
  activeTab: string;
  children: React.ReactNode;
}): JSX.Element {
  const [session] = useSession();

  function getAddress() {
    const { data, error } = useSWR(
      session ? ["account/address", session.accessToken] : null
    );

    return {
      addressResponse: data,
      addressLoading: !error && !data,
      addressError: error,
    };
  }

  function getPayment(addressSet: boolean) {
    const { data, error } = useSWR(
      session && addressSet ? ["account/payments", session.accessToken] : null
    );

    return {
      payment: data,
      paymentLoading: !error && !data,
      paymentError: error,
    };
  }

  const { addressResponse, addressLoading, addressError } = getAddress();

  const address = addressResponse?.data;
  const addressSet = addressLoading ? false : !!Object.keys(address).length;

  const { payment, paymentLoading, paymentError } = getPayment(addressSet);

  if (addressLoading) return <SpinnerLg text="Loading..." />;
  if (addressError) return <div>Error</div>;

  let disableListings = true;
  if (addressSet) {
    if (paymentLoading) return <SpinnerLg text="Loading..." />;
    if (paymentError) return <div>Error</div>;
    disableListings = !payment.data.charges_enabled;
  } else {
    disableListings = true;
  }

  return (
    <div>
      <div className="flex items-center justify-center py-2 space-x-2 border-b border-accent">
        <h3 className="text-accent-darkest">Your Listings</h3>
        <span className="relative flex items-center space-x-2 group">
          <div data-tip data-for="overflow">
            <PrimaryButton
              text="New Listing"
              href="listings/new"
              disabled={disableListings}
            />
          </div>
          <div data-tip data-for="overflow" className="text-center">
            <OverflowButton disabled={disableListings} />
            <ReactTooltip
              id="overflow"
              type="dark"
              place="top"
              multiline={true}
              effect="solid"
              disable={!disableListings}
            >
              <div>
                You need to set your address and
                <br />
                payment settings to create listings.
              </div>
            </ReactTooltip>
          </div>
        </span>
      </div>
      <div className="flex justify-between px-4 py-2">
        <SearchFilter />
        <SearchSort />
      </div>
      <div className="flex justify-center mt-4 mb-2 space-x-8">
        <LinkWrapper
          href="/listings?status=active"
          tab="active"
          activeTab={activeTab}
        >
          Active
        </LinkWrapper>
        <LinkWrapper
          href="/listings?status=sold"
          tab="sold"
          activeTab={activeTab}
        >
          Sold
        </LinkWrapper>
        <LinkWrapper
          href="/listings?status=draft"
          tab="draft"
          activeTab={activeTab}
        >
          Draft
        </LinkWrapper>
        <LinkWrapper
          href="/listings?status=removed"
          tab="removed"
          activeTab={activeTab}
        >
          Removed
        </LinkWrapper>
      </div>
      {children}
    </div>
  );
}
