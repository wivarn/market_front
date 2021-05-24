import SearchForm from "components/forms/search";

export default function Home() {
  return (
    <div>
      <SearchForm />
      <div className="flex">
        <div className="flex-grow m-2">
          <h1 className="text-xl text-bold">Support us on SubscribeStar!</h1>
          <a href="#">
            <div className="bg-blue-400 h-96">
              Some image link to SubscribeStar
            </div>
          </a>
        </div>
        <div className="flex-grow m-2">
          <h1 className="text-xl text-bold">Get some pro tips on selling</h1>
          <a href="#">
            <div className="bg-blue-400 h-96">
              Some image link to a youtube video
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
