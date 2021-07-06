export interface Article {
  id: number;
  title: string;
  description: string;
  publishedAt: string;
  devToSlug: string;
  devToPath: string;
  devToURL: string;
  commentsCount: number;
  publicReactionsCount: number;
  positiveReactionsCount: number;
  coverImage: string;
  tags: string[];
  canonical: string;
  collectionId: number;
  slug: string;
  markdown: string;
  html: string;
}

export interface CachedArticle {
  id: number;
  slug: string;
}

export interface HomePageArticles {
  latestBlog: Article;
  latestPortfolio: Article;
  featuredBlog: Article | null;
  featuredPortfolio: Article[];
}
