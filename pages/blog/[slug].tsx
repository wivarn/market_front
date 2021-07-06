import { GetStaticPaths, GetStaticProps } from "next";
import {
  getAllBlogArticles,
  getArticleFromCache,
} from "../../services/blog/forem";

// import DevToCallToAction from "../../components/DevToCallToAction";
import { Article } from "../../types/forem";
// import Layout from "../../components/Layout";
// import PageTitle from "../../components/PageTitle";
import { ParsedUrlQuery } from "querystring";
import fs from "fs";
// import moment from "moment";
import path from "path";

const cacheFile = ".dev-to-cache.json";

interface Props {
  article: Article;
  publishedDate: string;
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

const ArticlePage = ({ article, publishedDate }: Props): JSX.Element => (
  // <Layout title={article.title} description={article.description}>
  <>
    {article.coverImage && (
      <img
        src={article.coverImage}
        alt={`Cover for ${article.title}`}
        className="h-40 mx-auto md:mt-6 lg:mt-10 xl:mt-14 sm:h-48 md:h-52 lg:h-64 xl:h-68 2xl:h-80"
      />
    )}
    {/* <PageTitle title={article.title} center icons={false} /> */}
    <p className="w-full my-4 italic leading-relaxed text-center text-gray-600">
      {publishedDate}
    </p>
    <section className="flex flex-col items-center w-full mt-6 font-light leading-relaxed">
      <article
        className="w-full prose dark:prose-dark lg:prose-lg md:w-5/6 xl:w-9/12"
        dangerouslySetInnerHTML={{ __html: article.html }}
      />
      {/* <DevToCallToAction href={article.devToURL} /> */}
    </section>
  </>
  // </Layout>
);

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as Params;
  // Read cache and parse to object
  const cacheContents = fs.readFileSync(
    path.join(process.cwd(), cacheFile),
    "utf-8"
  );
  const cache = JSON.parse(cacheContents);

  // Fetch the article from the cache
  const article: Article = await getArticleFromCache(cache, slug);

  const publishedDate = article.publishedAt;

  return { props: { article, publishedDate } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Get the published articles and cache them for use in getStaticProps
  const articles: Article[] = await getAllBlogArticles();

  // Save article data to cache file
  fs.writeFileSync(
    path.join(process.cwd(), cacheFile),
    JSON.stringify(articles)
  );

  // Get the paths we want to pre-render based on posts
  const paths = articles.map(({ slug }) => {
    return {
      params: { slug },
    };
  });

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

export default ArticlePage;
