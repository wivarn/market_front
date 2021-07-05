import { NextSeo } from "next-seo";
import PageContainer from "components/pageContainer";

export default function help(): JSX.Element {
  return (
    <>
      <div>
        <PageContainer>
          <NextSeo title="Help" />
          <h3>Get help</h3>
        </PageContainer>
      </div>
    </>
  );
}
