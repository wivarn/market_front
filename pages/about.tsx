import Image from "next/image";
import { NextSeo } from "next-seo";
import PageContainer from "components/pageContainer";

export default function About(): JSX.Element {
  return (
    <>
      <div>
        <NextSeo title="About us" />
        <PageContainer yPadding="py-8 my-8 h-full">
          <h1 className="text-center h3">About us</h1>
          <div className="grid max-w-2xl grid-cols-1 py-8 mx-auto mt-4 space-y-8 md:grid-cols-2 justify-items-center md:space-y-0">
            <div className="grid grid-cols-1 text-center justify-items-center">
              <div className="mb-4">
                <Image
                  src="/kevin-profile.png"
                  height={200}
                  width={200}
                  alt="kevin"
                />
              </div>
              <h2 className="h4">Kevin Legere</h2>
              <p className="text-accent-dark">CEO | Founder</p>
            </div>
            <div className="grid grid-cols-1 text-center justify-items-center">
              <div className="mb-4">
                <Image
                  src="/ivan-profile.png"
                  height={200}
                  width={200}
                  alt="ivan"
                />
              </div>
              <h2 className="h4">Ivan Wong</h2>
              <p className="text-accent-dark">CTO | Co-Founder</p>
            </div>
          </div>
          <div className="max-w-xl mx-auto my-8">
            <h2 className="pb-4">Who are we?</h2>
            <p>
              We are a couple of friends who live in beautiful British Columbia,
              Canada and have a vision for providing a unique online experience
              for collectors.
            </p>
            <h2 className="py-4 h4">What is Skwirl?</h2>
            <p>
              Skwirl is a social marketplace where collectors can buy, sell and
              admire sports cards, trading cards and collectibles.
            </p>
            <h2 className="py-4 h4">Have a question?</h2>
            <p>
              We would love to hear from you! You can contact us{" "}
              <a
                href="https://support.skwirl.io/kb/en/contact"
                target="_blank"
                rel="noreferrer"
                className="underline text-info hover:text-primary"
              >
                here
              </a>
              .
            </p>
          </div>
        </PageContainer>
      </div>
    </>
  );
}
