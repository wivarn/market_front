import { PrimaryButton, SecondaryButton } from "components/buttons";

import Link from "next/link";
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
}) {
  const [session, loadingSession] = useSession();

  function getAddresses() {
    const { data, error } = useSWR(
      session ? ["account/address", session.accessToken] : null
    );

    return {
      addresses: data,
      isLoading: !error && !data,
      isError: error,
    };
  }

  const { addresses, isLoading, isError } = getAddresses();

  if (isLoading) return <div>Spinner</div>;
  if (isError) return <div>Error</div>;

  const noAddress = !addresses.data.length;

  return (
    <div>
      <div className="relative py-2 text-center border-b border-accent">
        <h3 className="inline-block p-2 text-accent-darkest">Your Listings</h3>
        <div className="top-0 right-0 space-x-4 md:block md:absolute">
          <PrimaryButton
            text="New Listing"
            href="listings/new"
            disabled={noAddress}
          />
          <SecondaryButton text="Update Template" href="listings/template" />
        </div>
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
