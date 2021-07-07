import { Article } from "../../types/forem";
import { GetStaticProps } from "next";
import Link from "next/link";
import PageContainer from "components/pageContainer";
import { getAllArticles } from "services/blog/forem";

interface Props {
  articles: Article[];
}

export default function BlogIndex({ articles }: Props): JSX.Element {
  return (
    <>
      <PageContainer>
        <h1 className="p-4 text-center">Our Blog</h1>
        {articles.map(
          ({ title, description, publishedAt, tags, canonical }) => (
            <div className="px-8 py-8" key={title}>
              <Link href={canonical}>
                <a>
                  <h2>{title}</h2>
                </a>
              </Link>
              <h4>{description}</h4>
              <p className="text-accent-dark">{publishedAt}</p>
              <p>{tags}</p>
            </div>
          )
        )}
      </PageContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const articles = await getAllArticles();

  return { props: { articles } };
};
