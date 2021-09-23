import { ChevronLeftIconSm, ChevronRightIconSm } from "./icons";

import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";

interface IProps {
  initialPage?: number;
  totalPages?: number;
}
export const Pagination = ({
  initialPage,
  totalPages,
}: IProps): JSX.Element | null => {
  const router = useRouter();

  if (initialPage == undefined || totalPages == undefined) return null;

  return (
    <ReactPaginate
      initialPage={initialPage}
      pageCount={totalPages}
      previousLabel={<ChevronLeftIconSm />}
      previousClassName=" bg-primary text-accent-lightest rounded-full"
      nextLabel={<ChevronRightIconSm />}
      nextClassName=" bg-primary text-accent-lightest rounded-full"
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
      containerClassName="items-center flex font-semibold flex-row lg:space-x-8 space-x-4 w-max mx-auto justify-center py-2"
      activeClassName="text-primary border-b-2 border-primary font-bold"
      onPageChange={({ selected }) => {
        if (router.query.page != undefined || selected) {
          router.push({
            pathname: router.pathname,
            query: { ...router.query, page: selected },
          });
        }
      }}
    />
  );
};
