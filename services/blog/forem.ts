import { Article, CachedArticle } from "../../types/forem";
import axios, { AxiosResponse } from "axios";
import { convertMarkdownToHtml, sanitizeMarkdown } from "./markdown";

const username = "wivarn";
const blogURL = `${process.env.NEXT_PUBLIC_BASE_URL}/blog/`;

// Takes a URL and returns the relative slug to your website
export const convertCanonicalURLToRelative = (canonical: string): string => {
  return canonical.replace(blogURL, "");
};

// Takes the data for an article returned by the Dev.to API and:
// * Parses it into the Article interface
// * Converts the full canonical URL into a relative slug to be used in getStaticPaths
// * Converts the supplied markdown into HTML (it does a little sanitising as Dev.to allows markdown headers (##) with out a trailing space
const convertDevtoResponseToArticle = (data: any): Article => {
  const slug = convertCanonicalURLToRelative(data.canonical_url);
  const markdown = sanitizeMarkdown(data.body_markdown);
  const html = convertMarkdownToHtml(markdown);

  const article: Article = {
    id: data.id,
    title: data.title,
    description: data.description,
    publishedAt: data.published_at,
    devToSlug: data.slug,
    devToPath: data.path,
    devToURL: data.url,
    commentsCount: data.comments_count,
    publicReactionsCount: data.public_reactions_count,
    positiveReactionsCount: data.positive_reactions_count,
    coverImage: data.cover_image,
    tags: data.tag_list,
    canonical: data.canonical_url,
    collectionId: data.collection_id || -1,
    slug,
    markdown,
    html,
  };
  return article;
};

const blogFilter = (article: Article) => article.canonical.startsWith(blogURL);

// Get all users articles from Dev.to
// Use the authenticated Dev.to article route to get the article markdown included
export const getAllArticles = async (): Promise<Article[]> => {
  const { data }: AxiosResponse = await axios.get(
    `https://dev.to/api/articles/me`,
    {
      params: { username, per_page: 1000 },
      headers: { "api-key": process.env.DEVTO_APIKEY },
    }
  );
  const articles: Article[] = data.map(convertDevtoResponseToArticle);
  return articles;
};

// Get all articles from Dev.to meant for the blog page
export const getAllBlogArticles = async (): Promise<Article[]> => {
  const articles = await getAllArticles();
  return articles.filter(blogFilter);
};

// Get my latest published article meant for the blog (and portfolio) pages
// export const getLatestBlogAndPortfolioArticle = async () => {
//   const articles = await getAllArticles();
//   const [latestBlog] = articles.filter(blogFilter);
//   const [latestPortfolio] = articles.filter(portfolioFilter); // ignore this! It's meant for another page (see the wallis.dev GitHub repository for more information)
//   return [latestBlog, latestPortfolio];
// };

// Gets an article from Dev.to using the ID that was saved to the cache earlier
export const getArticleFromCache = (
  cache: CachedArticle[],
  slug: string
): Article => {
  const article = cache.find(
    (cachedArticle) => cachedArticle.slug === slug
  ) as Article;
  return article;
};
