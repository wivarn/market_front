import Link from "next/link";
import { PrimaryButton, SecondaryButton } from "components/buttons";

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
            tab == activeTab ? "border-b-2 border-primary text-primary" : ""
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
}) {
  return (
    <div className="p-4">
      <div className="space-x-2">
        <h2 className="inline-block m-6 text-accent-darkest">
          What would you like to sell?
        </h2>
        <PrimaryButton text="New Listing" href="listings/new" />
        <SecondaryButton text="Listing Template" href="listings/template" />
      </div>
      <div className="flex p-4 mb-8 space-x-8 font-semibold text-accent-darker">
        <LinkWrapper
          href="/listings?status=active"
          tab="active"
          activeTab={activeTab}
        >
          Active Listings
        </LinkWrapper>
        <LinkWrapper
          href="/listings?status=sold"
          tab="sold"
          activeTab={activeTab}
        >
          Sold Listings
        </LinkWrapper>
        <LinkWrapper
          href="/listings?status=draft"
          tab="draft"
          activeTab={activeTab}
        >
          Draft Listings
        </LinkWrapper>
        <LinkWrapper
          href="/listings?status=removed"
          tab="removed"
          activeTab={activeTab}
        >
          Removed Listings
        </LinkWrapper>
      </div>
      {children}
    </div>
  );
}
