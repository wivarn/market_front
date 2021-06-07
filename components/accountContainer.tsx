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
        <p className={tab == activeTab ? "underline text-primary" : ""}>
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
      <div className="flex py-1 space-x-4 font-bold text-primary-dark">
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
          href="/account/purchaseHistory"
          tab="purchaseHistory"
          activeTab={activeTab}
        >
          Purchase History
        </LinkWrapper>
        <LinkWrapper
          href="/account/paymentInformation"
          tab="paymentInformation"
          activeTab={activeTab}
        >
          Payment Information
        </LinkWrapper>
      </div>
      {children}
    </div>
  );
}
