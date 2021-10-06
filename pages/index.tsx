import {
  DiscordIcon,
  FacebookIconSm,
  InstagramIconSm,
  SuccessIcon,
  SuccessIconSm,
  TwitterIconSm,
  YoutubeIconSm,
} from "components/icons";
import { PrimaryButton, SecondaryButton } from "components/buttons";

import { IconButtonLink } from "components/buttons/iconButton";
import Image from "next/image";
import { NextSeo } from "next-seo";
import { RecentListings } from "components/listing/recentListings";

export default function Home(): JSX.Element {
  return (
    <div>
      <NextSeo title="Home" />
      <div className="pt-10 pb-20 bg-secondary-lighter">
        <div className="container px-4 mx-auto max-w-screen-2xl">
          <header className="grid text-center lg:justify-items-start justify-items-center lg:items-center lg:flex lg:text-left">
            <div className="py-4">
              <h1 className="text-4xl font-extrabold lg:text-6xl xl:text-7xl text-accent-darkest">
                {
                  <>
                    {"The "}
                    <span className="text-info">trading card</span>
                    {"\n"}
                    <span>marketplace for</span>
                    {"\n"}
                    <div className="text-primary">modern collectors</div>
                  </>
                }
              </h1>
              <h3 className="py-2 text-accent-darker">
                Find the next centerpiece for your collection!
              </h3>
              <PrimaryButton text="Sign up now" href="/account/new" />
            </div>
            <img
              src="/assets/hero-cards.svg"
              alt="Card Hero"
              className="px-4 mt-16 lg:float-right"
            />
          </header>
        </div>
      </div>
      <RecentListings />
      <div className="py-16 bg-secondary">
        <div className="grid mx-auto space-y-2 justify-items-center">
          <div className="text-2xl text-accent-darker lg:text-4xl">
            Buy with confidence
          </div>
          <div className="grid items-center grid-cols-1 md:grid-cols-2">
            <Image src="/assets/verify_seller.svg" height={300} width={300} />
            <div className="max-w-lg space-y-2">
              <h4>Our sellers are pre-screened to ensure:</h4>
              <div className="flex space-x-2 text-success">
                <SuccessIconSm />
                <span className="text-black">
                  Identity verification and contact information
                </span>
              </div>
              <div className="flex space-x-2 text-success">
                <SuccessIconSm />
                <span className="text-black">
                  Experience selling and shipping
                </span>
              </div>
              <div className="flex space-x-2 text-success">
                <SuccessIconSm />
                <span className="text-black">
                  History of great customer service
                </span>
              </div>
              <div className="flex space-x-2 text-success">
                <SuccessIconSm />
                <span className="text-black">High quality products</span>
              </div>
            </div>
          </div>
          <div className="pt-4">
            <SecondaryButton
              text="Learn more about buying"
              href="https://support.skwirl.io/kb/en/article/buying-on-skwirl"
            />
          </div>
        </div>
      </div>
      <div className="py-16 bg-primary">
        <div className="grid max-w-4xl mx-auto space-y-2 text-center text-white">
          <div className="text-2xl lg:text-4xl">
            Why you&#39;ll love selling on Skwirl
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center">
            <div>
              <Image src="/assets/low_fee.svg" height={200} width={200} />
              <h5>Low seller fees</h5>
            </div>
            <div>
              <Image src="/assets/free_listings.svg" height={200} width={200} />
              <h5>Unlimited free listings</h5>
            </div>
            <div>
              <Image
                src="/assets/fraud_protection.svg"
                height={200}
                width={200}
              />
              <h5>Fraud protection</h5>
            </div>
          </div>
          <div className="pt-8">
            <SecondaryButton
              text="Learn more about selling"
              href="https://support.skwirl.io/kb/en/article/selling-on-skwirl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
