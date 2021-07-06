// import ArticleCard from "../components/ArticleCard";
import { Article } from "../../types/forem";
import { GetStaticProps } from "next";
import Link from "next/link";
import { getAllBlogArticles } from "services/blog/forem";

// import Layout from "../components/Layout";
// import PageTitle from "../components/PageTitle";
// import Section from "../components/Section";
// import { getAllBlogArticles } from "../lib/devto";

interface Props {
  articles: Article[];
}

// const title = "Blog ✍️";
// const subtitle =
//   "I share anything that may help others, technologies I'm using and cool things I've made.";

const BlogIndex = ({ articles }: Props): JSX.Element => (
  <>
    {/* <Layout title={title} description={subtitle}>
      <PageTitle title={title} subtitle={subtitle} />

      <Section linebreak> */}
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
      // <ArticleCard
      //   key={title}
      //   title={title}
      //   description={description}
      //   date={publishedAt}
      //   tags={tags}
      //   canonical={canonical}
      // />
    ))}
    {/* </Section>
    </Layout> */}
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  // Get all the articles that have a canonical URL pointed to your blog
  const articles = await getAllBlogArticles();

  // Pass articles to the page via props
  return { props: { articles } };
};
export default BlogIndex;
