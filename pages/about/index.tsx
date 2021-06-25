import { FeatureRow } from "components/featureRow";
import Link from "next/link";
import { Logo } from "components/logo";
import { NextSeo } from "next-seo";
import { PageSection } from "components/section";
import { PrimaryButton } from "components/buttons";

export default function about(): JSX.Element {
  return (
    <>
      <div>
        <NextSeo title="About" />
        <PageSection yPadding="py-6">
          <div className="flex flex-wrap items-center justify-between">
            <div>
              <Link href="">
                <a>
                  <Logo xl={true} />
                </a>
              </Link>
            </div>

            <nav>
              <ul className="flex items-center space-x-8 text-xl font-medium text-accent-darker">
                <li>
                  <Link href="">
                    <a className="font-medium hover:text-primary">About Us</a>
                  </Link>
                </li>
                <li>
                  <Link href="">
                    <a className="font-medium hover:text-primary">Contact</a>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </PageSection>
        <PageSection yPadding="pt-20 pb-32">
          <header className="text-center">
            <h1 className="text-5xl font-semibold whitespace-pre-line text-accent-darker leading-hero">
              {
                <>
                  {"The "} <span className="text-info">social marketplace</span>{" "}
                  {" for\n"}
                  <span className="text-primary">modern collectors</span>
                </>
              }
            </h1>
            <div className="mt-4 mb-16 text-2xl text-accent-dark">
              Launching in Fall 2021.
            </div>
            <Link href="">
              <a>
                <PrimaryButton href="" text="Subscribe for updates" />
              </a>
            </Link>
          </header>
        </PageSection>
      </div>

      <div>
        <PageSection
          title="Connect with other collectors"
          description="Skwirl is designed for collectors to buy and sell trading cards and other collectibles."
        >
          <FeatureRow
            title="Lower seller fees"
            description="Keep more of your profits, so that you can expand your collection faster."
            image="/promo/money.svg"
            imageAlt="Low Selling Fees"
          />
          <FeatureRow
            title="Innovative Trust System"
            description="Trust is built by making connections and building relationships. We help make those connections with peers around the world so that you don't have to."
            image="/promo/trust.svg"
            imageAlt="Second feature alt text"
            reverse
          />
          <FeatureRow
            title="Built by collectors"
            description="We share your passion and understand your needs. We will work with the community to build the best possible platform for collectors around the world."
            image="/promo/innovation.svg"
            imageAlt="Third feature alt text"
          />
          <FeatureRow
            title="More than a marketplace"
            description="Engage with other collectors, show off your prized items and subscribe to a feed that is tailored to your interests."
            image="/promo/more.svg"
            imageAlt="Third feature alt text"
            reverse
          />
        </PageSection>
      </div>
    </>
  );
}
