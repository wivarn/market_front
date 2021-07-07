import { Article } from "../../types/forem";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import PageContainer from "components/pageContainer";
import { getAllArticles } from "services/blog/forem";

interface Props {
  articles: Article[];
}
const BlogIndex = ({ articles }: Props): JSX.Element => (
  <>
    {articles.map(({ title, description, publishedAt, tags, canonical }) => (
      <div key={title}>
        <PageContainer>
          <Link href={canonical}>
            <a>
              <h1>{title}</h1>
            </a>
          </Link>
          <h4>{description}</h4>
          <p>{publishedAt}</p>
          <p>{tags}</p>
        </PageContainer>
      </div>
    ))}
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const articles = await getAllArticles();

  return { props: { articles } };
};
export default BlogIndex;
