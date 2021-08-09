import { FacebookIconSm, InstagramIconSm, TwitterIconSm } from "../icons";

import { IconButtonLink } from "../iconButton";
import Link from "next/link";
import { LogoXl } from "../logo";

export default function LandingFooter(): JSX.Element {
  return (
    <footer className="py-8 text-center bg-secondary-light">
      <div className="text-2xl font-semibold text-primary">
        <LogoXl colour="text-primary" />
        <div className="flex items-center justify-center mt-4 space-x-4">
          <Link href="/blog">
            <a className="text-lg font-semibold hover:text-primary text-info-darker">
              blog
            </a>
          </Link>
          <IconButtonLink
            url="https://www.facebook.com/skwirl.io"
            icon={<FacebookIconSm />}
            target="_blank"
          />
          <IconButtonLink
            url="https://www.instagram.com/skwirl.io"
            icon={<InstagramIconSm />}
            target="_blank"
          />
          <IconButtonLink
            url="https://twitter.com/skwirl_io"
            icon={<TwitterIconSm />}
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
