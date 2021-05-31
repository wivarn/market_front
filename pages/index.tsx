import { NextSeo } from "next-seo";
import SearchForm from "components/forms/search";

export default function Home() {
  return (
    <div>
      <NextSeo title="Home" />
      <SearchForm />
      <div className="flex p-4 space-x-8">
        <div className="flex-grow">
          <h3>Support us on SubscribeStar!</h3>
          <a href="#">
            <div className="rounded-md shadow-md bg-secondary h-96">
              Some image link to SubscribeStar
            </div>
          </a>
        </div>
        <div className="flex-grow">
          <h3>Get some pro tips on selling</h3>
          <a href="#">
            <div className="rounded-md shadow-md bg-secondary h-96">
              Some image link to a youtube video
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
