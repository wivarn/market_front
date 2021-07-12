import { SmFacebookIcon, SmInstagramIcon, SmTwitterIcon } from "../icons";

import { IconButtonLink } from "../iconButton";
import Link from "next/link";
import { Logo } from "../logo";
import { PageSection } from "components/landing/section";

export default function LandingHeader(): JSX.Element {
  return (
    <>
      <PageSection yPadding="py-2">
        <div className="flex flex-wrap items-center justify-between">
          <div>
            <Link href="/">
              <a>
                <Logo colour="text-primary" />
              </a>
            </Link>
          </div>

          <nav>
            <ul className="flex items-center space-x-2 text-lg font-semibold md:space-x-4 text-info-darker">
              <li>
                <Link href="/">
                  <a className="hover:text-primary">home</a>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <a className="hover:text-primary">blog</a>
                </Link>
              </li>
              <li>
                <IconButtonLink
                  url="https://www.facebook.com/skwirl.io"
                  icon={<SmFacebookIcon />}
                  target="_blank"
                />
              </li>
              <li>
                <IconButtonLink
                  url="https://www.instagram.com/skwirlapp"
                  icon={<SmInstagramIcon />}
                  target="_blank"
                />
              </li>
              <li>
                <IconButtonLink
                  url="https://twitter.com/Skwirl7"
                  icon={<SmTwitterIcon />}
                  target="_blank"
                />
              </li>
            </ul>
          </nav>
        </div>
      </PageSection>
    </>
  );
}
