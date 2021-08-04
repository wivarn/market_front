import Link from "next/link";

export const UserReviewsPreview = (): JSX.Element => {
  return (
    <div>
      <h3 className="mb-4 text-center">
        Recent Reviews{" "}
        <Link href="#">
          <a className="text-base underline text-info">View All</a>
        </Link>
      </h3>
      Coming soon
    </div>
  );
};
