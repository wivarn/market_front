import {
  HiOutlineCurrencyDollar,
  HiOutlineShoppingCart,
  HiOutlineUserCircle,
} from "react-icons/hi";

import { GiSquirrel } from "react-icons/gi";

export const CurrencyDollarIcon = () => {
  return <HiOutlineCurrencyDollar className="icon" />;
};

export const ShoppingCartIcon = () => {
  return <HiOutlineShoppingCart className="icon" />;
};

export const UserCircleIcon = () => {
  return <HiOutlineUserCircle className="icon" />;
};

export const LargeUserCircleIcon = () => {
  return <HiOutlineUserCircle className="h-20 w-20 float-left" />;
};

export const SquirrelIcon = () => {
  return <GiSquirrel className="icon-large" />;
};
