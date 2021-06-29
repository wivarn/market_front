import { SmFacebookIcon, SmInstagramIcon, SmTwitterIcon } from "../icons";

import { IconButtonLink } from "../iconButton";
import Link from "next/link";
import { Logo } from "../logo";

export default function LandingFooter(): JSX.Element {
  return (
    <footer className="py-8 text-center bg-cover bg-heroshiny">
      <div className="text-2xl font-semibold text-primary">
        <Logo xl={true} />
        <div className="flex items-center justify-center mt-4 space-x-4">
          <Link href="/about/team">
            <a className="text-lg font-semibold hover:text-primary text-info-darker">
              Blog
            </a>
          </Link>
          <IconButtonLink
            url="https://www.facebook.com/Skwirl-110235447975935"
            icon={<SmFacebookIcon />}
            target="_blank"
          />
          <IconButtonLink
            url="https://www.instagram.com/skwirlapp"
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
