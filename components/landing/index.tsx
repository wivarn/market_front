import { DiscordIcon } from "components/icons";
import { FeatureColumn } from "components/landing/featureColumn";
import { FeatureRow } from "components/landing/featureRow";
import LandingFooter from "components/landing/footer";
import LandingHeader from "components/landing/header";
import MailChimpForm from "components/forms/mailChimp";
import { NextSeo } from "next-seo";
import { PageSection } from "components/landing/section";
import { SecondaryButton } from "components/buttons";

export default function Landing(): JSX.Element {
  return (
    <>
      <NextSeo title="Home" />
      <div>
        <LandingHeader />
        <PageSection yPadding="pt-10 pb-20">
          <div>
            <header className="grid text-center lg:justify-items-start justify-items-center lg:items-center lg:flex lg:text-left">
              <div className="py-4">
                <h1 className="text-4xl font-extrabold lg:text-6xl xl:text-7xl text-accent-darkest">
                  {
                    <>
                      {"The "}{" "}
                      <span className="text-info">social marketplace</span>{" "}
                      {" for\n"}
                      <span className="text-primary">modern collectors</span>
                    </>
                  }
                </h1>
                <div className="mt-4 mb-8 text-xl font-light lg:text-2xl text-accent-darker">
                  Launching in Fall 2021.
                </div>
                <h3 className="py-2">
                  Subscribe for early access, a chance to win free cards and
                  more!
                </h3>
                <MailChimpForm />
              </div>
              <img
                src="/assets/hero-cards.svg"
                alt="Card Hero"
                className="px-4 mt-16 lg:float-right"
              />
            </header>
          </div>
        </PageSection>
      </div>
      <div className="bg-info-darker">
        <PageSection yPadding="pb-16">
          <div className="md:flex md:justify-between">
            <FeatureColumn
              title="Buy"
              description="Find the missing piece to your collection"
              image="/assets/buy.png"
              imageAlt="Buy trading cards online"
            />
            <FeatureColumn
              title="Sell"
              description="Profit from the items you no longer need"
              image="/assets/sell.png"
              imageAlt="Sell trading cards online"
            />
            <FeatureColumn
              title="Admire"
              description="Be admired for your most prized possessions"
              image="/assets/admire.png"
              imageAlt="Admire collections"
            />
          </div>
        </PageSection>
      </div>
      <div>
        <PageSection title="Why you'll love skwirl">
          <FeatureRow
            title="Lower seller fees"
            description="Our 5% seller fee is more than 50% cheaper than everyone else. No hidden surprises and unlimited free listings. Keep more of your profits, so you can expand your collection faster."
            image="/assets/money.svg"
            imageAlt="Low Selling Fees"
          />
          <FeatureRow
            title="Innovative Trust System"
            description="Real trust cannot rely on just user reviews. Trust is built through a network of connections and relationships with other collectors. We do that for you, so you can buy and sell with confidence."
            image="/assets/trust.svg"
            imageAlt="Trust system"
            reverse
          />
          <FeatureRow
            title="Built by collectors"
            description="We are collectors too. We share your passion and understand your needs. We will work with you to build the best collectible marketplace together."
            image="/assets/innovation.svg"
            imageAlt="Built by collectors"
          />
          <FeatureRow
            title="More than just a marketplace"
            description="We believe that collecting is deeper than online transactions. That's why we're integrating social features so you can admire your favourite collectors, show off your prized possessions and subscribe to a feed that's tailored to your interests."
            image="/assets/more.svg"
            imageAlt="Marketplace"
            reverse
          />
        </PageSection>
        <div className="bg-primary">
          <PageSection>
            <div className="grid justify-center space-y-2 justify-items-center">
              <div className="text-white">
                <DiscordIcon />
              </div>
              <div className="text-2xl text-white lg:text-4xl">
                Join the conversation
              </div>
              <SecondaryButton
                text="Chat with us on Discord"
                href="https://discord.gg/WHvDqHC2SC"
              />
            </div>
          </PageSection>
        </div>
        <div className="bg-info-darker">
          <PageSection>
            <div className="grid p-4 text-center rounded-md justify-items-center sm:p-12 bg-primary-100">
              <div className="text-2xl font-semibold md:text-3xl">
                <div className="text-secondary">
                  We are a small team, looking for collectors who share our
                  vision.
                </div>
                <div className="py-4 text-primary">
                  Support us by becoming a member or...
                </div>
              </div>

              <div className="mt-3 whitespace-no-wrap">
                <a
                  href="https://www.buymeacoffee.com/skwirl"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="https://img.buymeacoffee.com/button-api/?text=Buy us a beer&emoji=🍺&slug=skwirl&button_colour=d44927&font_colour=ffffff&font_family=Lato&outline_colour=ffffff&coffee_colour=FFDD00" />
                </a>
              </div>
            </div>
          </PageSection>
        </div>
        <LandingFooter />
      </div>
    </>
  );
}
