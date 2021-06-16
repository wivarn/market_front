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

export default function AccountContainer({
  activeTab,
  children,
}: {
  activeTab: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-8 mb-8">
      <h2 className="text-center">Your Account</h2>
      <div className="space-x-8 font-medium text-accent-darker">
        <div className="flex justify-center mt-8 space-x-8">
          <LinkWrapper
            href="/account/profile"
            tab="profile"
            activeTab={activeTab}
          >
            Profile
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
            Purchases
          </LinkWrapper>
        </div>
      </div>
      {children}
    </div>
  );
}
