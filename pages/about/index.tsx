import { NextSeo } from "next-seo";
import PageContainer from "components/pageContainer";

export default function About(): JSX.Element {
  return (
    <>
      <div>
        <NextSeo title="About us" />
        <PageContainer>
          <h3 className="text-center">About us</h3>
        </PageContainer>
      </div>
    </>
  );
}
