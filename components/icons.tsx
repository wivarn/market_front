import {
  FaDiscord,
  FaFacebookSquare,
  FaInstagramSquare,
  FaRedditSquare,
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

export const MdSkwirlIcon = (): JSX.Element => {
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

export const SpinnerIcon = (): JSX.Element => {
  return <CgSpinner className="icon animate-spin" />;
};

export const LgSpinnerIcon = (): JSX.Element => {
  return <CgSpinner className="icon-lg animate-spin" />;
};

export const UploadIcon = (): JSX.Element => {
  return <HiCloudUpload className="icon-lg" />;
};

export const SmBackArrowIcon = (): JSX.Element => {
  return <HiArrowCircleLeft className="icon-sm" />;
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

export const SmChevronRightIcon = (): JSX.Element => {
  return <HiChevronRight className="icon-sm" />;
};

export const SmOverflowIcon = (): JSX.Element => {
  return <HiDotsVertical className="icon-sm" />;
};

export const SmChevronLeftIcon = (): JSX.Element => {
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

export const SmInfoCircle = (): JSX.Element => {
  return <HiInformationCircle className="icon-sm" />;
};

export const SmChevronDownIcon = (): JSX.Element => {
  return <HiChevronDown className="icon-sm" />;
};

export const LgUserCircleIcon = (): JSX.Element => {
  return <HiOutlineUserCircle className="float-left icon-2xl" />;
};

export const SmCheckCircleIcon = (): JSX.Element => {
  return <HiCheckCircle className="icon-sm" />;
};

export const SmExclamationCircleIcon = (): JSX.Element => {
  return <HiExclamationCircle className="icon-sm" />;
};

// Social media icons

export const DiscordIcon = (): JSX.Element => {
  return <FaDiscord className="icon" />;
};

export const SmTwitterIcon = (): JSX.Element => {
  return <FaTwitterSquare className="icon-sm" />;
};

export const SmFacebookIcon = (): JSX.Element => {
  return <FaFacebookSquare className="icon-sm" />;
};

export const SmYoutubeIcon = (): JSX.Element => {
  return <FaYoutubeSquare className="icon-sm" />;
};

export const SmInstagramIcon = (): JSX.Element => {
  return <FaInstagramSquare className="icon-sm" />;
};

export const SmRedditIcon = (): JSX.Element => {
  return <FaRedditSquare className="icon-sm" />;
};
