import Link from "next/link";

export const UserReviewsPreview = (): JSX.Element => {
  return (
    <div>
      <h2>
        Reviews <Link href="#">View All</Link>
      </h2>
      Some Reviews
    </div>
  );
};
