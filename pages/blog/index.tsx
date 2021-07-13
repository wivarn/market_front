import { Article } from "../../types/forem";
import { GetStaticProps } from "next";
import LandingFooter from "components/landing/footer";
import LandingHeader from "components/landing/header";
import Link from "next/link";
import { NextSeo } from "next-seo";
import PageContainer from "components/pageContainer";
import { getAllArticles } from "services/blog/forem";

interface Props {
  articles: Article[];
}

export default function BlogIndex({ articles }: Props): JSX.Element {
  return (
    <>
      <NextSeo title="Blog" />
      <LandingHeader />
      <div className="grid items-center bg-cover h-96 bg-bloghead">
        <PageContainer>
          <div className="grid justify-center mx-auto rounded-md">
            <h2 className="text-center text-white">Our Blog</h2>
          </div>
        </PageContainer>
      </div>
      <div className="bg-cover bg-blog">
        <PageContainer>
          {articles.map(
            ({
              title,
              description,
              author,
              profileImage,
              readableDate,
              coverImage,
              slug,
            }) => (
              <div className="py-4" key={title}>
                <div className="max-w-4xl mx-auto bg-white border rounded-md hover:shadow-md">
                  <Link href={`/blog/${slug}`}>
                    <a>
                      <img
                        src={coverImage}
                        className="object-cover w-full rounded-t-md"
                      />
                      <div className="p-4">
                        <h3>{title}</h3>
                        <p className="line-clamp-2 text-accent-darker">
                          {description}
                        </p>

                        <div className="items-center mt-4">
                          <img
                            src={profileImage}
                            className="float-left h-12 mr-4 rounded-full"
                          />
                          <p className="font-bold text-accent-darker">
                            {author}
                          </p>
                          <p className="text-accent-dark">{readableDate}</p>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
            )
          )}
        </PageContainer>
        <LandingFooter />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const articles = await getAllArticles();

  return { props: { articles } };
};
