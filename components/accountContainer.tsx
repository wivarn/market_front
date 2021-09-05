import { CardContainer2xl } from "./cardContainer";
import Link from "next/link";
import { UserSettingsContext } from "contexts/userSettings";
import { useContext } from "react";

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
              ? "pb-2 border-b-2 border-primary text-primary font-bold"
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
  const { userSettings } = useContext(UserSettingsContext);
  const href = userSettings.selling_enabled ? "/account/payments" : "/apply";
  return (
    <div className="my-4">
      <CardContainer2xl>
        <h3 className="py-2 text-center">Your Account</h3>
        <div className="font-semibold text-accent-darker">
          <div className="flex justify-center mt-4 space-x-4 md:space-x-8">
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
            <LinkWrapper href={href} tab="payments" activeTab={activeTab}>
              Payments
            </LinkWrapper>
          </div>
        </div>
        {children}
      </CardContainer2xl>
    </div>
  );
}
