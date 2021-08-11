import Link from "next/link";
import { LogoXl } from "./logo";

export default function Footer(): JSX.Element {
  return (
    <footer className="py-8 text-center bg-info-darker">
      <div className="text-2xl font-semibold">
        <LogoXl colour="text-primary" />
        <nav>
          <ul className="flex flex-col justify-center mt-4 space-y-2 text-lg font-semibold text-white md:space-y-0 md:space-x-4 md:flex-row">
            <li>
              <Link href="/">
                <a className="hover:text-primary">Home</a>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <a className="hover:text-primary">About</a>
              </Link>
            </li>
            <li>
              <a
                href="https://skwirl.zendesk.com"
                rel="noreferrer"
                target="_blank"
                className="hover:text-primary"
              >
                Support
              </a>
            </li>
          </ul>
        </nav>
        <div className="mt-4 text-sm">
          <div className="font-normal text-accent-light">
            © Copyright {new Date().getFullYear()} Skwirl.
          </div>
        </div>
      </div>
    </footer>
  );
}
