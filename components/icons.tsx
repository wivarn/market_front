import {
  HiArrowNarrowDown,
  HiBookOpen,
  HiCheck,
  HiCheckCircle,
  HiChevronDown,
  HiChevronLeft,
  HiChevronRight,
  HiExclamation,
  HiExclamationCircle,
  HiFilter,
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

import { CgSpinner } from "react-icons/cg";
import { GiSquirrel } from "react-icons/gi";

export const UserChevronIcon = (): JSX.Element => {
  return (
    <div className="relative block">
      <HiOutlineUserCircle className="icon" />
      <HiChevronDown className="absolute bottom-0 -right-5 icon-sm" />
    </div>
  );
};

export const SpinnerIcon = (): JSX.Element => {
  return <CgSpinner className="icon animate-spin" />;
};

export const CurrencyDollarIcon = (): JSX.Element => {
  return <HiOutlineCurrencyDollar className="icon" />;
};

export const SmCheckIcon = (): JSX.Element => {
  return <HiCheck className="icon-sm" />;
};

export const FilterIcon = (): JSX.Element => {
  return <HiFilter className="icon" />;
};

export const ChevronRightIcon = (): JSX.Element => {
  return <HiChevronRight className="icon" />;
};

export const ChevronLeftIcon = (): JSX.Element => {
  return <HiChevronLeft className="icon" />;
};

export const ShoppingCartIcon = (): JSX.Element => {
  return <HiOutlineShoppingCart className="icon" />;
};

export const UserCircleIcon = (): JSX.Element => {
  return <HiOutlineUserCircle className="icon" />;
};

export const SearchCircleIcon = (): JSX.Element => {
  return <HiSearchCircle className="icon" />;
};

export const TagIcon = (): JSX.Element => {
  return <HiTag className="icon" />;
};

export const BookOpenIcon = (): JSX.Element => {
  return <HiBookOpen className="icon" />;
};

export const TrashIcon = (): JSX.Element => {
  return <HiTrash className="icon" />;
};

export const MenuIcon = (): JSX.Element => {
  return <HiMenu className="icon" />;
};

export const SuccessIcon = (): JSX.Element => {
  return <HiCheckCircle className="icon" />;
};

export const WarningIcon = (): JSX.Element => {
  return <HiExclamation className="icon" />;
};

export const GradedIcon = (): JSX.Element => {
  return <HiShieldCheck className="icon" />;
};

export const StarIcon = (): JSX.Element => {
  return <HiStar className="icon" />;
};

export const ErrorIcon = (): JSX.Element => {
  return <HiXCircle className="icon" />;
};

export const XIcon = (): JSX.Element => {
  return <HiX className="icon" />;
};

export const SmXIcon = (): JSX.Element => {
  return <HiX className="icon-xs" />;
};

export const SmArrowNarrowDown = (): JSX.Element => {
  return <HiArrowNarrowDown className="icon-sm" />;
};

export const InfoCircle = (): JSX.Element => {
  return <HiInformationCircle className="icon" />;
};

export const SmChevronDownIcon = (): JSX.Element => {
  return <HiChevronDown className="icon-sm" />;
};

export const LgUserCircleIcon = (): JSX.Element => {
  return <HiOutlineUserCircle className="float-left icon-2xl" />;
};

export const LgSquirrelIcon = (): JSX.Element => {
  return <GiSquirrel className="icon-lg" />;
};

export const SmCheckCircleIcon = (): JSX.Element => {
  return <HiCheckCircle className="icon-sm" />;
};

export const SmExclamationCircleIcon = (): JSX.Element => {
  return <HiExclamationCircle className="icon-sm" />;
};
