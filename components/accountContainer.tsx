import Link from "next/link";

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

export default function AccountContainer({
  activeTab,
  children,
}: {
  activeTab: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-4">
      <h2>Your Account</h2>
      <div className="flex p-4 mb-8 space-x-8 font-semibold text-accent-darker">
        <LinkWrapper
          href="/account/profile"
          tab="profile"
          activeTab={activeTab}
        >
          User Profile
        </LinkWrapper>
        <LinkWrapper
          href="/account/address"
          tab="address"
          activeTab={activeTab}
        >
          Address
        </LinkWrapper>
        <LinkWrapper
          href="/account/payments"
          tab="payments"
          activeTab={activeTab}
        >
          Payments
        </LinkWrapper>
        <LinkWrapper
          href="/account/purchaseHistory"
          tab="purchaseHistory"
          activeTab={activeTab}
        >
          Purchase History
        </LinkWrapper>
      </div>
      {children}
    </div>
  );
}
