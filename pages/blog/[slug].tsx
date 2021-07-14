import { GetStaticPaths, GetStaticProps } from "next";
import { getAllArticles, getArticleFromCache } from "../../services/blog/forem";

import { Article } from "../../types/forem";
import LandingFooter from "components/landing/footer";
import LandingHeader from "components/landing/header";
import Head from "next/head";
import PageContainer from "components/pageContainer";
import { ParsedUrlQuery } from "querystring";
import fs from "fs";
import path from "path";

const cacheFile = ".forem.json";

interface Params extends ParsedUrlQuery {
  slug: string;
}

export default function ArticlePage(article: Article): JSX.Element {
  return (
    <>
      <Head>
        <title>{article.title} | Skwirl</title>
        <meta property="og:image" content={article.coverImage} />
      </Head>
      <LandingHeader />
      <div className="bg-cover bg-blogbg">
        <PageContainer>
          <article className="max-w-4xl p-4 mx-auto mt-8 bg-white rounded-md">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full rounded-md"
            />
            <h2 className="mt-4 headline">{article.title}</h2>
            <div className="items-center my-4 leading-relaxed byline text-accent-dark">
              <img
                src={article.profileImage}
                alt={article.author}
                className="float-left mr-4 rounded-full h-14"
              />
              <div className="text-xl font-bold author text-accent-darker">
                {article.author}
              </div>
              <time className="text-xl pubdate" dateTime={article.publishedAt}>
                {article.readableDate}
              </time>
            </div>
            <section className="flex flex-col mt-6 font-light leading-relaxed">
              <div
                className="prose article-content prose-blue lg:prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: article.html }}
              />
            </section>
          </article>
        </PageContainer>
        <LandingFooter />
      </div>
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

  return { props: article };
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
