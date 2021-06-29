import { CTAButton } from "components/buttons";
import { FeatureColumn } from "components/landing/featureColumn";
import { FeatureRow } from "components/landing/featureRow";
import Footer from "components/footer";
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
            <header className="items-center text-center lg:text-left justify-items-center lg:flex">
              <div className="py-4">
                <h1 className="text-5xl font-extrabold whitespace-pre-line lg:text-6xl xl:text-7xl text-accent-darkest leading-hero">
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
              description="Profit from the collectibles you don’t want"
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
        <PageSection
          title="Why skwirl is the place to be"
          description="Add the missing piece to your collection, sell the items you don't need and be admired for your most prized possessions."
        >
          <FeatureRow
            title="Lower seller fees"
            description="Keep more of your profits, so that you can expand your collection faster."
            image="/promo/money.svg"
            imageAlt="Low Selling Fees"
          />
          <FeatureRow
            title="Innovative Trust System"
            description="We help build trust with other collectors so that you can buy with confidence."
            image="/promo/trust.svg"
            imageAlt="Trust system"
            reverse
          />
          <FeatureRow
            title="Built by collectors"
            description="We share your passion for collecting and understand your needs."
            image="/promo/innovation.svg"
            imageAlt="Built by collectors"
          />
          <FeatureRow
            title="More than a marketplace"
            description="Admire collections, show off your prized items and subscribe to a feed."
            image="/promo/more.svg"
            imageAlt="Marketplace"
            reverse
          />
        </PageSection>
        <div className="bg-info-darker">
          <PageSection>
            <div className="flex flex-col p-4 text-center rounded-md sm:text-left sm:flex-row sm:items-center sm:justify-between sm:p-12 bg-primary-100">
              <div className="text-2xl font-semibold">
                <div className="text-secondary">
                  We are looking for other collectors who share our vision.
                </div>
                <div className="text-primary">Subscribe for early access.</div>
              </div>

              <div className="mt-3 whitespace-no-wrap sm:mt-0 sm:ml-2">
                <Link href="/">
                  <a>
                    <CTAButton href="" text="Subscribe now" />
                  </a>
                </Link>
              </div>
            </div>
          </PageSection>
        </div>
        <Footer />
      </div>
    </>
  );
}
