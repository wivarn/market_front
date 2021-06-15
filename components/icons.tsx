import {
  HiArrowNarrowDown,
  HiBookOpen,
  HiCheckCircle,
  HiChevronDown,
  HiExclamation,
  HiExclamationCircle,
  HiInformationCircle,
  HiMenu,
  HiOutlineCurrencyDollar,
  HiOutlineShoppingCart,
  HiOutlineUserCircle,
  HiSearchCircle,
  HiShieldCheck,
  HiStar,
  HiTag,
  HiTrash,
  HiX,
  HiXCircle,
} from "react-icons/hi";

import { GiSquirrel } from "react-icons/gi";

export const UserChevronIcon = () => {
  return (
    <div className="relative block">
      <HiOutlineUserCircle className="icon" />
      <HiChevronDown className="absolute bottom-0 -right-5 icon-sm" />
    </div>
  );
};

export const CurrencyDollarIcon = () => {
  return <HiOutlineCurrencyDollar className="icon" />;
};

export const ShoppingCartIcon = () => {
  return <HiOutlineShoppingCart className="icon" />;
};

export const UserCircleIcon = () => {
  return <HiOutlineUserCircle className="icon" />;
};

export const SearchCircleIcon = () => {
  return <HiSearchCircle className="icon" />;
};

export const TagIcon = () => {
  return <HiTag className="icon" />;
};

export const BookOpenIcon = () => {
  return <HiBookOpen className="icon" />;
};

export const TrashIcon = () => {
  return <HiTrash className="icon" />;
};

export const MenuIcon = () => {
  return <HiMenu className="icon" />;
};

export const SuccessIcon = () => {
  return <HiCheckCircle className="icon" />;
};

export const WarningIcon = () => {
  return <HiExclamation className="icon" />;
};

export const GradedIcon = () => {
  return <HiShieldCheck className="icon" />;
};

export const StarIcon = () => {
  return <HiStar className="icon" />;
};

export const ErrorIcon = () => {
  return <HiXCircle className="icon" />;
};

export const XIcon = () => {
  return <HiX className="icon" />;
};

export const SmXIcon = () => {
  return <HiX className="icon-xs" />;
};

export const SmArrowNarrowDown = () => {
  return <HiArrowNarrowDown className="icon-sm" />;
};

export const InfoCircle = () => {
  return <HiInformationCircle className="icon" />;
};

export const SmChevronDownIcon = () => {
  return <HiChevronDown className="icon-sm" />;
};

export const LgUserCircleIcon = () => {
  return <HiOutlineUserCircle className="float-left icon-2xl" />;
};

export const LgSquirrelIcon = () => {
  return <GiSquirrel className="icon-lg" />;
};

export const SmCheckCircleIcon = () => {
  return <HiCheckCircle className="icon-sm" />;
};

export const SmExclamationCircleIcon = () => {
  return <HiExclamationCircle className="icon-sm" />;
};
