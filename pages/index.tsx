import SearchForm from "components/forms/search";

export default function Home() {
  return (
    <div>
      <SearchForm />
      <div className="flex p-4 space-x-8">
        <div className="flex-grow">
          <h3>Support us on SubscribeStar!</h3>
          <a href="#">
            <div className="bg-secondary rounded-md shadow-md h-96">
              Some image link to SubscribeStar
            </div>
          </a>
        </div>
        <div className="flex-grow">
          <h3>Get some pro tips on selling</h3>
          <a href="#">
            <div className="bg-secondary rounded-md shadow-md h-96">
              Some image link to a youtube video
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
