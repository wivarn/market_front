import {
  DiscordIcon,
  FacebookIconSm,
  InstagramIconSm,
  TwitterIconSm,
  YoutubeIconSm,
} from "components/icons";
import { PrimaryButton, SecondaryButton } from "components/buttons";

import { IconButtonLink } from "components/iconButton";
import Landing from "components/landing";
import MailChimpForm from "components/forms/mailChimp";
import { NextSeo } from "next-seo";
import { RecentListings } from "components/listing/recentListings";

export default function Home(): JSX.Element {
  if (process.env.NEXT_PUBLIC_FEATURE_LAUNCHED != "true") return <Landing />;

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
                    <span className="text-info">social marketplace</span>{" "}
                    {" for\n"}
                    <span className="text-primary">modern collectors</span>
                  </>
                }
              </h1>
              <h3 className="py-2">
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
      <div className="py-16 bg-primary">
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
      </div>
      <div className="py-16 bg-secondary">
        <div className="grid justify-center space-y-2 justify-items-center">
          <div className="text-2xl text-info-darker lg:text-4xl">
            Follow us on social media
          </div>
          <div className="flex justify-center mt-4 space-x-4">
            <IconButtonLink
              url="https://www.youtube.com/channel/UCDe_aLZv7CoKLxiZxAPbDJg"
              icon={<YoutubeIconSm />}
              target="_blank"
            />
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
        </div>
      </div>
    </div>
  );
}
