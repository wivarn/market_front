import { Article } from "../../types/forem";
import { GetStaticProps } from "next";
import Link from "next/link";
import { getAllArticles } from "services/blog/forem";

interface Props {
  articles: Article[];
}

export default function BlogIndex({ articles }: Props): JSX.Element {
  return (
    <>
      {articles.map(({ title, description, publishedAt, tags, canonical }) => (
        <div key={title}>
          <Link href={canonical}>
            <a>
              <h1>{title}</h1>
            </a>
          </Link>
          <h2>{description}</h2>
          <p>{publishedAt}</p>
          <p>{tags}</p>
        </div>
      ))}
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const articles = await getAllArticles();

  return { props: { articles } };
};
