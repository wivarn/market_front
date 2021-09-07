import Image from "next/image";
import { NextSeo } from "next-seo";
import PageContainer from "components/pageContainer";

export default function About(): JSX.Element {
  return (
    <>
      <div>
        <NextSeo title="About us" />
        <PageContainer yPadding="py-8 my-8 h-full">
          <h3 className="text-center">About us</h3>
          <div className="grid max-w-2xl grid-cols-1 py-8 mx-auto mt-4 space-y-8 md:grid-cols-2 justify-items-center md:space-y-0">
            <div className="grid grid-cols-1 text-center justify-items-center">
              <div className="mb-4">
                <Image src="/kevin-profile.png" height={200} width={200} />
              </div>
              <h4>Kevin Legere</h4>
              <p className="text-accent-dark">CEO | Founder</p>
            </div>
            <div className="grid grid-cols-1 text-center justify-items-center">
              <div className="mb-4">
                <Image src="/ivan-profile.png" height={200} width={200} />
              </div>
              <h4>Ivan Wong</h4>
              <p className="text-accent-dark">CTO | Co-Founder</p>
            </div>
          </div>
          <div className="max-w-xl mx-auto my-8">
            <h4 className="pb-4">Who are we?</h4>
            <p>
              We are a couple of friends who live in beautiful British Columbia,
              Canada and have a vision for providing a unique online experience
              for collectors.
            </p>
            <h4 className="py-4">What is Skwirl?</h4>
            <p>
              Skwirl is a social marketplace where collectors can buy, sell and
              admire sports cards, trading cards and collectibles.
            </p>
            <h4 className="py-4">Have a question?</h4>
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
