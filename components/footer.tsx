import {
  SmFacebookIcon,
  SmInstagramIcon,
  SmRedditIcon,
  SmYoutubeIcon,
} from "./icons";

import { IconButtonLink } from "./iconButton";
import Link from "next/link";

export default function Footer(): JSX.Element {
  return (
    <footer className="py-16 text-center border-t border-b bg-accent-lightest">
      <div className="text-2xl font-semibold text-primary">
        Skwirl
        <nav>
          <ul className="flex flex-row justify-center mt-8 space-x-8 text-xl font-medium text-accent-darker">
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>About</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Help</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Contact</a>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex justify-center mt-8 space-x-4">
          <IconButtonLink url="/" icon={<SmYoutubeIcon />} />
          <IconButtonLink url="/" icon={<SmFacebookIcon />} />
          <IconButtonLink url="/" icon={<SmRedditIcon />} />
          <IconButtonLink url="/" icon={<SmInstagramIcon />} />
        </div>
        <div className="mt-8 text-sm">
          <div className="font-normal text-accent-dark">
            © Copyright {new Date().getFullYear()} Skwirl.
          </div>
        </div>
      </div>
    </footer>
  );
}
