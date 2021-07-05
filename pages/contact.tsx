import { NextSeo } from "next-seo";
import PageContainer from "components/pageContainer";

export default function contact(): JSX.Element {
  return (
    <>
      <div>
        <PageContainer>
          <NextSeo title="Contact" />
          <h3>Contact Us</h3>
        </PageContainer>
      </div>
    </>
  );
}
