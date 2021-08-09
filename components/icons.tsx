import {
  FaDiscord,
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
  FaYoutubeSquare,
} from "react-icons/fa";
import {
  HiArrowCircleLeft,
  HiArrowNarrowDown,
  HiBookOpen,
  HiCheck,
  HiCheckCircle,
  HiChevronDown,
  HiChevronLeft,
  HiChevronRight,
  HiCloudUpload,
  HiDotsVertical,
  HiExclamation,
  HiFilter,
  HiInformationCircle,
  HiMenu,
  HiOutlineCurrencyDollar,
  HiOutlineShoppingCart,
  HiOutlineUserCircle,
  HiSearchCircle,
  HiShieldCheck,
  HiSortDescending,
  HiStar,
  HiTag,
  HiTrash,
  HiX,
  HiXCircle,
} from "react-icons/hi";

import { CgSpinner } from "react-icons/cg";
import Image from "next/image";

export const UserChevronIcon = (): JSX.Element => {
  return (
    <div className="relative block">
      <HiOutlineUserCircle className="icon" />
      <HiChevronDown className="absolute bottom-0 -right-5 icon-sm" />
    </div>
  );
};

export const SkwirlIcon = (): JSX.Element => {
  return (
    <Image src="/skwirl-logo.png" alt="skwirl logo" width={32} height={32} />
  );
};

export const SkwirlIconMd = (): JSX.Element => {
  return (
    <Image
      src="/skwirl.svg"
      alt="skwirl logo"
      width={48}
      height={48}
      layout="fixed"
    />
  );
};

export const SpinnerIconXs = (): JSX.Element => {
  return <CgSpinner className="icon-xs animate-spin" />;
};

export const SpinnerIcon = (): JSX.Element => {
  return <CgSpinner className="icon animate-spin" />;
};

export const SpinnerIconLg = (): JSX.Element => {
  return <CgSpinner className="icon-lg animate-spin" />;
};

export const UploadIcon = (): JSX.Element => {
  return <HiCloudUpload className="icon-lg" />;
};

export const BackArrowIconSm = (): JSX.Element => {
  return <HiArrowCircleLeft className="icon-sm" />;
};

export const CurrencyDollarIcon = (): JSX.Element => {
  return <HiOutlineCurrencyDollar className="icon" />;
};

export const CheckIconSm = (): JSX.Element => {
  return <HiCheck className="icon-sm" />;
};

export const FilterIconSm = (): JSX.Element => {
  return <HiFilter className="icon-xs" />;
};

export const ChevronRightIcon = (): JSX.Element => {
  return <HiChevronRight className="icon" />;
};

export const ChevronLeftIcon = (): JSX.Element => {
  return <HiChevronLeft className="icon" />;
};

export const ChevronRightIconSm = (): JSX.Element => {
  return <HiChevronRight className="icon-sm" />;
};

export const OverflowIconSm = (): JSX.Element => {
  return <HiDotsVertical className="icon-sm" />;
};

export const ChevronLeftIconSm = (): JSX.Element => {
  return <HiChevronLeft className="icon-sm" />;
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

export const SortIconXs = (): JSX.Element => {
  return <HiSortDescending className="icon-xs" />;
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

export const ErrorIconSm = (): JSX.Element => {
  return <HiXCircle className="icon-sm" />;
};

export const XIcon = (): JSX.Element => {
  return <HiX className="icon" />;
};

export const XIconSm = (): JSX.Element => {
  return <HiX className="icon-xs" />;
};

export const ArrowDownSm = (): JSX.Element => {
  return <HiArrowNarrowDown className="icon-sm" />;
};

export const InfoCircle = (): JSX.Element => {
  return <HiInformationCircle className="icon" />;
};

export const InfoCircleSm = (): JSX.Element => {
  return <HiInformationCircle className="icon-sm" />;
};

export const ChevronDownIconSm = (): JSX.Element => {
  return <HiChevronDown className="icon-sm" />;
};

export const CheckCircleIconSm = (): JSX.Element => {
  return <HiCheckCircle className="icon-sm" />;
};

// Social media icons

export const DiscordIcon = (): JSX.Element => {
  return <FaDiscord className="icon" />;
};

export const TwitterIconSm = (): JSX.Element => {
  return <FaTwitterSquare className="icon-sm" />;
};

export const FacebookIconSm = (): JSX.Element => {
  return <FaFacebookSquare className="icon-sm" />;
};

export const YoutubeIconSm = (): JSX.Element => {
  return <FaYoutubeSquare className="icon-sm" />;
};

export const InstagramIconSm = (): JSX.Element => {
  return <FaInstagramSquare className="icon-sm" />;
};
