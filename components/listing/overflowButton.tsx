import { OverflowButton } from "components/overflowButton";

export interface Props {
  disabled: boolean;
}

export const ListingOverflowButton = (props: Props): JSX.Element => {
  const menuItems = [
    { href: "/listings/bulkCreate", text: "Bulk Listings" },
    { href: "/listings/template", text: "Listing Template" },
  ];

  return <OverflowButton {...props} menutItems={menuItems} />;
};
