import {
  SmFacebookIcon,
  SmInstagramIcon,
  SmRedditIcon,
  SmTwitterIcon,
  SmYoutubeIcon,
} from "./icons";

import { IconButtonLink } from "./iconButton";
import Link from "next/link";
import { Logo } from "./logo";

export default function Footer(): JSX.Element {
  return (
    <footer className="py-8 text-center border-t border-b bg-accent-lightest">
      <div className="text-2xl font-semibold text-primary">
        <Logo xl={true} />
        <nav>
          <ul className="flex flex-col justify-center mt-4 space-y-2 text-lg font-semibold md:space-y-0 md:space-x-4 md:flex-row text-accent-darker">
            <li>
              <Link href="/">
                <a className="hover:text-primary">Home</a>
              </Link>
            </li>
            <li>
              <Link href="/blog">
                <a className="hover:text-primary">Blog</a>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <a className="hover:text-primary">About</a>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <a className="hover:text-primary">Contact</a>
              </Link>
            </li>
            <li>
              <Link href="/help">
                <a className="hover:text-primary">Help</a>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex justify-center mt-4 space-x-4">
          <IconButtonLink
            url="https://www.youtube.com/channel/UCDe_aLZv7CoKLxiZxAPbDJg"
            icon={<SmYoutubeIcon />}
            target="_blank"
          />
          <IconButtonLink
            url="https://www.facebook.com/Skwirl-110235447975935"
            icon={<SmFacebookIcon />}
            target="_blank"
          />
          <IconButtonLink
            url="https://www.reddit.com/r/Skwirl/new/"
            icon={<SmRedditIcon />}
            target="_blank"
          />
          <IconButtonLink
            url="https://www.instagram.com/skwirlapp/?hl=en"
            icon={<SmInstagramIcon />}
            target="_blank"
          />
          <IconButtonLink
            url="https://twitter.com/Skwirl7"
            icon={<SmTwitterIcon />}
            target="_blank"
          />
        </div>
        <div className="mt-4 text-sm">
          <div className="font-normal text-accent-dark">
            © Copyright {new Date().getFullYear()} Skwirl.
          </div>
        </div>
      </div>
    </footer>
  );
}
