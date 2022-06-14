import { NextSeo } from "next-seo";
import PageContainer from "components/pageContainer";

export default function About(): JSX.Element {
  return (
    <>
      <div>
        <NextSeo title="About us" />
        <PageContainer yPadding="py-8 my-8 h-full">
          <h1 className="pb-3 text-center h3">We&apos;re closing up shop.</h1>
          <div className="whitespace-pre-line ">
            It&apos;s been a great ride connecting with so many collectors over
            the last year. Unfortunately, we have decided to move on to some
            other projects and Skwirl will no longer be supported or maintained.
            We have disabled the ability to purchase items from the site. If you
            are interested in forking the code or purchasing Skwirl you can
            contact us.
            {"\n\n"}
            Thanks so much for your support!
            {"\n\n"}
            Skwirl Team.
          </div>
        </PageContainer>
      </div>
    </>
  );
}
