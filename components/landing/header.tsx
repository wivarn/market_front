import { FacebookIconSm, InstagramIconSm, TwitterIconSm } from "../icons";

import { IconButtonLink } from "../iconButton";
import Link from "next/link";
import { LogoXl } from "../logo";
import { PageSection } from "components/landing/section";

export default function LandingHeader(): JSX.Element {
  return (
    <PageSection yPadding="py-2">
      <div className="flex flex-wrap items-center justify-between">
        <div>
          <Link href="/">
            <a>
              <LogoXl colour="text-primary" />
            </a>
          </Link>
        </div>

        <nav>
          <ul className="flex items-center space-x-4 text-xl font-semibold text-info-darker">
            <li>
              <Link href="/blog">
                <a className="hover:text-primary">blog</a>
              </Link>
            </li>
            <li>
              <IconButtonLink
                url="https://www.facebook.com/skwirl.io"
                icon={<FacebookIconSm />}
                target="_blank"
              />
            </li>
            <li>
              <IconButtonLink
                url="https://www.instagram.com/skwirl.io"
                icon={<InstagramIconSm />}
                target="_blank"
              />
            </li>
            <li>
              <IconButtonLink
                url="https://twitter.com/skwirl_io"
                icon={<TwitterIconSm />}
                target="_blank"
              />
            </li>
          </ul>
        </nav>
      </div>
    </PageSection>
  );
}
