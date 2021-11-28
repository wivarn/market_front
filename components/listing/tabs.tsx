import Link from "next/link";
import { ListingOverflowButton } from "components/listing/overflowButton";
import { ListingSort } from "components/forms/listing/sort";
import { PrimaryButton } from "components/buttons";
import React from "react";
import ReactTooltip from "react-tooltip";
import SearchFilter from "components/forms/listing/searchFilter";
import { UserSettingsContext } from "contexts/userSettings";
import { useContext } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

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
  const { data: session, status } = useSession();
  const sessionLoading = status === "loading";
  const router = useRouter();
  const { userSettings } = useContext(UserSettingsContext);

  const disableListings =
    !userSettings.address_set || !userSettings.stripe_linked;

  if (!sessionLoading && !session) {
    router.push("/");
  }

  return (
    <div>
      <div className="flex items-center justify-center py-2 space-x-2 border-b border-accent">
        <h3 className="text-accent-darkest">Your Listings</h3>
        <span className="relative flex items-center space-x-2 group">
          <div data-tip data-for="overflow">
            <PrimaryButton
              text="New Listing"
              href="/listings/new"
              disabled={disableListings}
            />
          </div>
          <div data-tip data-for="overflow" className="text-center">
            <ListingOverflowButton disabled={disableListings} />
            <ReactTooltip
              id="overflow"
              type="dark"
              place="top"
              multiline={true}
              effect="solid"
              disable={!disableListings}
            >
              <div>
                Set your address and payment
                <br />
                settings to create listings.
              </div>
            </ReactTooltip>
          </div>
        </span>
      </div>
      <div className="grid items-center justify-between grid-cols-5 py-2 justify-items-center">
        <SearchFilter />
        <div className="flex justify-center col-span-3 mt-4 mb-2 space-x-4 md:space-x-8">
          <LinkWrapper
            href="/listings?state=active&sort=newest"
            tab="active"
            activeTab={activeTab}
          >
            Active
          </LinkWrapper>
          <LinkWrapper
            href="/listings?state=sold&sort=newest"
            tab="sold"
            activeTab={activeTab}
          >
            Sold
          </LinkWrapper>
          <LinkWrapper
            href="/listings?state=draft&sort=newest"
            tab="draft"
            activeTab={activeTab}
          >
            Draft
          </LinkWrapper>
          <LinkWrapper
            href="/listings?state=removed&sort=newest"
            tab="removed"
            activeTab={activeTab}
          >
            Removed
          </LinkWrapper>
        </div>
        <ListingSort />
      </div>
      {children}
    </div>
  );
}
