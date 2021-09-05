import Image from "next/image";
import { NextSeo } from "next-seo";
import PageContainer from "components/pageContainer";

export default function apply(): JSX.Element {
  return (
    <>
      <PageContainer yPadding="mt-8 py-8">
        <NextSeo title="Apply" />
        <h3 className="text-center">Become a seller</h3>
        <div className="container mt-8">
          <div className="grid justify-center max-w-xl p-4 mx-auto rounded-md ">
            <Image src="/assets/become_a_seller.svg" height={400} width={400} />
            <div className="mt-4 text-lg text-center">
              <span>
                Selling on Skwirl is currently in beta. If you would like early
                access to selling, email{" "}
                <a
                  href="mailto:sellers@skwirl.io"
                  rel="noreferrer"
                  target="_blank"
                  className="underline text-info"
                >
                  sellers@skwirl.io
                </a>{" "}
                or{" "}
                <a
                  href="https://support.skwirl.io/kb/en/contact"
                  rel="noreferrer"
                  target="_blank"
                  className="underline text-info"
                >
                  contact us.
                </a>
              </span>
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
}
