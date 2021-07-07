import { Article, CachedArticle } from "../../types/forem";
import { convertMarkdownToHtml, sanitizeMarkdown } from "./markdown";

import axios from "axios";

const usernames = ["wivarn", "kleverrobot"];
const foremApiBasePaths = [
  "https://dev.to/api/",
  "https://the.community.club/api/",
];
const blogURL = `${process.env.NEXT_PUBLIC_BASE_URL}/blog/`;

// Takes a URL and returns the relative slug to your website
export const convertCanonicalURLToRelative = (canonical: string): string => {
  return canonical.replace(blogURL, "");
};

// Takes the data for an article returned by the Dev.to API and:
// * Parses it into the Article interface
// * Converts the full canonical URL into a relative slug to be used in getStaticPaths
// * Converts and sanitaizes the supplied markdown into HTML
const convertResponseToArticle = (data: any): Article => {
  const slug = convertCanonicalURLToRelative(data.canonical_url);
  const markdown = sanitizeMarkdown(data.body_markdown);
  const html = convertMarkdownToHtml(markdown);

  const article: Article = {
    id: data.id,
    title: data.title,
    description: data.description,
    publishedAt: data.published_at,
    url: data.url,
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

const blogFilter = (article: any) => article.canonical_url.startsWith(blogURL);

const getArticleIds = async (username: string, basePath: string) => {
  return await axios
    .get(`${basePath}articles/latest`, {
      params: { username: username, per_page: 999 },
    })
    .then((response) => {
      const articles = response.data.filter(blogFilter);
      return articles.map((article: any) => article.id);
    })
    .catch((error) => {
      console.log(error.response);
      return [];
    });
};

export const getAllArticles = async (): Promise<Article[]> => {
  const articles: Article[] = [];
  for (const username of usernames) {
    for (const basePath of foremApiBasePaths) {
      for (const id of await getArticleIds(username, basePath)) {
        axios.get(`${basePath}/articles/${id}`).then((response) => {
          articles.push(convertResponseToArticle(response.data));
        });
      }
    }
  }

  return articles;
};

export const getArticleFromCache = (
  cache: CachedArticle[],
  slug: string
): Article => {
  const article = cache.find(
    (cachedArticle) => cachedArticle.slug === slug
  ) as Article;
  return article;
};
