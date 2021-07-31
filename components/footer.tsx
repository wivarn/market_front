import {
  SmFacebookIcon,
  SmInstagramIcon,
  SmRedditIcon,
  SmTwitterIcon,
  SmYoutubeIcon,
} from "./icons";

import { IconButtonLinkLight } from "./iconButton";
import Link from "next/link";
import { Logo } from "./logo";

export default function Footer(): JSX.Element {
  return (
    <footer className="py-8 text-center border-t bg-info-darker border-accent">
      <div className="text-2xl font-semibold">
        <Logo colour="text-primary" />
        <nav>
          <ul className="flex flex-col justify-center mt-4 space-y-2 text-lg font-semibold text-white md:space-y-0 md:space-x-4 md:flex-row">
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
        <div className="flex justify-center mt-4 space-x-4">
          <IconButtonLinkLight
            url="https://www.youtube.com/channel/UCDe_aLZv7CoKLxiZxAPbDJg"
            icon={<SmYoutubeIcon />}
            target="_blank"
          />
          <IconButtonLinkLight
            url="https://www.facebook.com/skwirl.io"
            icon={<SmFacebookIcon />}
            target="_blank"
          />
          <IconButtonLinkLight
            url="https://www.reddit.com/r/Skwirl"
            icon={<SmRedditIcon />}
            target="_blank"
          />
          <IconButtonLinkLight
            url="https://www.instagram.com/skwirl.io"
            icon={<SmInstagramIcon />}
            target="_blank"
          />
          <IconButtonLinkLight
            url="https://twitter.com/skwirl_io"
            icon={<SmTwitterIcon />}
            target="_blank"
          />
        </div>
        <div className="mt-4 text-sm">
          <div className="font-normal text-accent-light">
            © Copyright {new Date().getFullYear()} Skwirl.
          </div>
        </div>
      </div>
    </footer>
  );
}
