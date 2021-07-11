import {
  SmFacebookIcon,
  SmInstagramIcon,
  SmTwitterIcon,
} from "components/icons";

import { CTAButton } from "components/buttons";
import { FeatureColumn } from "components/landing/featureColumn";
import { FeatureRow } from "components/landing/featureRow";
import { IconButtonLink } from "components/iconButton";
import LandingFooter from "components/landing/footer";
import Link from "next/link";
import { Logo } from "components/logo";
import { NextSeo } from "next-seo";
import { PageSection } from "components/landing/section";

export default function Landing(): JSX.Element {
  return (
    <>
      <NextSeo title="Landing" />
      <div className="bg-cover bg-heroshiny">
        <PageSection yPadding="py-2">
          <div className="flex flex-wrap items-center justify-between">
            <div>
              <Link href="">
                <a>
                  <Logo colour="text-primary" />
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
        <PageSection yPadding="pt-10 pb-20">
          <div>
            <header className="grid text-center lg:justify-items-start justify-items-center lg:items-center lg:flex lg:text-left">
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
                <CTAButton href="#" text="Stay in the know" />
              </div>
              <img
                src="/assets/hero-cards.svg"
                alt="Card Hero"
                className="mt-8 lg:float-right"
              />
            </header>
          </div>
        </PageSection>
      </div>
      <div className=" bg-info-darker">
        <PageSection yPadding="pb-16">
          <div className="md:flex md:justify-between">
            <FeatureColumn
              title="Buy"
              description="Find the missing piece to your collection"
              image="/promo/buy.png"
              imageAlt="Buy trading cards online"
            />
            <FeatureColumn
              title="Sell"
              description="Profit from the items you no longer need"
              image="/promo/sell.png"
              imageAlt="Sell trading cards online"
            />
            <FeatureColumn
              title="Admire"
              description="Be admired for your most prized possessions"
              image="/promo/admire.png"
              imageAlt="Admire collections"
            />
          </div>
        </PageSection>
      </div>
      <div className="bg-cover bg-secshiny">
        <PageSection title="Why you'll love skwirl">
          <FeatureRow
            title="Lower seller fees"
            description="Our 5% seller fee is more than 50% cheaper than everyone else. No hidden surprises and unlimited free listings. Keep more of your profits, so you can expand your collection faster."
            image="/promo/money.svg"
            imageAlt="Low Selling Fees"
          />
          <FeatureRow
            title="Innovative Trust System"
            description="Real trust cannot rely on just user reviews. Trust is built through a network of connections and relationships with other collectors. We do that for you, so you can buy and sell with confidence."
            image="/promo/trust.svg"
            imageAlt="Trust system"
            reverse
          />
          <FeatureRow
            title="Built by collectors"
            description="We are collectors too. We share your passion and understand your needs. We will work with you to build the best collectible marketplace together."
            image="/promo/innovation.svg"
            imageAlt="Built by collectors"
          />
          <FeatureRow
            title="More than just a marketplace"
            description="We believe that collecting is deeper than online transactions. That's why we're integrating social features so you can admire your favourite collectors, show off your prized possessions and subscribe to a feed that's tailored to your interests."
            image="/promo/more.svg"
            imageAlt="Marketplace"
            reverse
          />
        </PageSection>
        <div className="bg-info-darker">
          <PageSection>
            <div className="grid p-4 text-center rounded-md justify-items-center sm:p-12 bg-primary-100">
              <div className="text-2xl font-semibold md:text-3xl">
                <div className="text-secondary">
                  We are a small team, looking for collectors who share our
                  vision.
                </div>
                <div className="py-4 text-primary">
                  Become a member or buy us a beer.
                </div>
              </div>

              <div className="mt-3 whitespace-no-wrap">
                <a href="https://www.buymeacoffee.com/skwirl">
                  <img src="https://img.buymeacoffee.com/button-api/?text=Buy us a beer&emoji=🍺&slug=skwirl&button_colour=d44927&font_colour=ffffff&font_family=Lato&outline_colour=ffffff&coffee_colour=FFDD00" />
                </a>
              </div>
              <div>
                <h3></h3>
              </div>
            </div>
          </PageSection>
        </div>
        <LandingFooter />
      </div>
    </>
  );
}
