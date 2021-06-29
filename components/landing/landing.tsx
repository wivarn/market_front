import { CTAButton } from "components/buttons";
import { FeatureColumn } from "components/landing/featureColumn";
import { FeatureRow } from "components/landing/featureRow";
import LandingFooter from "components/landing/footer";
import Link from "next/link";
import { Logo } from "components/logo";
import { NextSeo } from "next-seo";
import { PageSection } from "components/landing/section";

export default function Landing(): JSX.Element {
  return (
    <>
      <NextSeo title="Landing" />
      <div className="bg-secondary">
        <PageSection yPadding="py-2">
          <div className="flex flex-wrap items-center justify-between">
            <div>
              <Link href="">
                <a>
                  <Logo xl={true} />
                </a>
              </Link>
            </div>

            <nav>
              <ul className="flex items-center space-x-8 text-xl font-semibold text-info-darker">
                <li>
                  <Link href="">
                    <a className="hover:text-primary">Blog</a>
                  </Link>
                </li>
                <li>
                  <Link href="">
                    <a className="hover:text-primary">Contact</a>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </PageSection>
        <PageSection yPadding="pt-10 pb-20">
          <div>
            <header className="items-center grid-cols-1 mx-auto text-center lg:flex lg:text-left">
              <div className="py-4">
                <h1 className="text-4xl font-extrabold whitespace-pre-line lg:text-6xl xl:text-7xl text-accent-darkest leading-hero">
                  {
                    <>
                      {"The "}{" "}
                      <span className="text-info">social marketplace</span>{" "}
                      {" for\n"}
                      <span className="text-primary">modern collectors</span>
                    </>
                  }
                </h1>
                <div className="mt-4 mb-8 text-2xl font-light text-accent-darker">
                  Launching in Fall 2021.
                </div>
                <Link href="">
                  <a>
                    <CTAButton href="" text="Stay in the know" />
                  </a>
                </Link>
              </div>
              <img src="/assets/hero-cards.svg" alt="Card Hero" />
            </header>
          </div>
        </PageSection>
      </div>
      <div className=" bg-info-darker">
        <PageSection yPadding="pb-16">
          <div className="md:flex md:justify-between">
            <FeatureColumn
              title="Buy"
              description="Add that missing piece to your collection"
              image="/promo/buy.png"
              imageAlt="Buy trading cards online"
            />
            <FeatureColumn
              title="Sell"
              description="Profit from the collectibles you no longer need"
              image="/promo/sell.png"
              imageAlt="Sell trading cards online"
            />
            <FeatureColumn
              title="Admire"
              description="Show off your most prized possessions"
              image="/promo/admire.png"
              imageAlt="Admire collections"
            />
          </div>
        </PageSection>
      </div>
      <div>
        <PageSection title="Why you'll love skwirl">
          <FeatureRow
            title="Lower seller fees"
            description="Our fee is more than 50% cheaper than our comptetitors. Keep more of your profits, so that you can expand your collection faster."
            image="/promo/money.svg"
            imageAlt="Low Selling Fees"
          />
          <FeatureRow
            title="Innovative Trust System"
            description="The trust system is broken on other marketplace apps. We build trust through a network of relationships with other collectors so that you can buy and sell with confidence."
            image="/promo/trust.svg"
            imageAlt="Trust system"
            reverse
          />
          <FeatureRow
            title="Built by collectors"
            description="We are also collectors. We share your passion and understand your needs. We will work with you to build the best collectible marketplace together. "
            image="/promo/innovation.svg"
            imageAlt="Built by collectors"
          />
          <FeatureRow
            title="More than just a marketplace"
            description="We believe that collecting is deeper than transactions. That's why we built social features so that you can admire other collections, show off your prized possessions and subscribe to a feed that's tailored to your interests."
            image="/promo/more.svg"
            imageAlt="Marketplace"
            reverse
          />
        </PageSection>
        <div className="bg-info-darker">
          <PageSection>
            <div className="flex flex-col p-4 text-center rounded-md sm:text-left sm:flex-row sm:items-center sm:justify-between sm:p-12 bg-primary-100">
              <div className="text-3xl font-semibold">
                <div className="text-secondary">
                  We are looking for other collectors who share our vision.
                </div>
                <div className="text-primary">Sign up for early access.</div>
              </div>

              <div className="mt-3 whitespace-no-wrap sm:mt-0 sm:ml-2">
                <Link href="/">
                  <a>
                    <CTAButton href="" text="Sign up now" />
                  </a>
                </Link>
              </div>
            </div>
          </PageSection>
        </div>
        <LandingFooter />
      </div>
    </>
  );
}
