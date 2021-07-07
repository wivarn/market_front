import { GetStaticPaths, GetStaticProps } from "next";
import { getAllArticles, getArticleFromCache } from "../../services/blog/forem";

import { Article } from "../../types/forem";
import PageContainer from "components/pageContainer";
import { ParsedUrlQuery } from "querystring";
import fs from "fs";
import path from "path";

const cacheFile = ".forem.json";

interface Props {
  article: Article;
  publishedDate: string;
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

export default function ArticlePage({
  article,
  publishedDate,
}: Props): JSX.Element {
  return (
    <>
      <PageContainer>
        {article.coverImage && (
          <img
            src={article.coverImage}
            alt={`Cover for ${article.title}`}
            className="w-3/4 mx-auto mt-8 rounded-md md:w-5/6 xl:w-9/12"
          />
        )}
        <h2 className="mt-4 text-center">{article.title}</h2>
        <p className="w-full my-2 italic leading-relaxed text-center text-gray-600">
          {publishedDate}
        </p>
        <section className="flex flex-col items-center w-full mt-6 font-light leading-relaxed">
          <article
            className="w-3/4 prose dark:prose-dark lg:prose-lg md:w-5/6 xl:w-9/12"
            dangerouslySetInnerHTML={{ __html: article.html }}
          />
        </section>
      </PageContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as Params;
  // Read cache and parse to object
  const cacheContents = fs.readFileSync(
    path.join(process.cwd(), cacheFile),
    "utf-8"
  );
  const cache = JSON.parse(cacheContents);

  // Fetch the article from the cache
  const article: Article = getArticleFromCache(cache, slug);

  const publishedDate = article.publishedAt;

  return { props: { article, publishedDate } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Get the published articles and cache them for use in getStaticProps
  const articles: Article[] = await getAllArticles();

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
