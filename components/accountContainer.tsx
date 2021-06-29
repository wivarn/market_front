import { CardContainer2xl } from "./cardContainer";
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
}): JSX.Element {
  return (
    <div className="my-4">
      <CardContainer2xl>
        <h3 className="py-4 text-center border-b border-accent">
          Your Profile
        </h3>
        <div className="font-semibold text-accent-darker">
          <div className="flex justify-center mt-8 space-x-4 md:space-x-8">
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
      </CardContainer2xl>
    </div>
  );
}
