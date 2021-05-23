import Link from "next/link";

export default function Home() {
  return (
    <div>
      this is the index page
      <div>
        <Link href="/listings">
          <a className="inline-flex p-2 mr-4">
            <span className="text-xl font-bold uppercase tracking-wide">
              Listings
            </span>
          </a>
        </Link>
      </div>
    </div>
  );
}
