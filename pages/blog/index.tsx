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
        <h2 className="p-4 text-center">Blog</h2>
        {articles.map(
          ({
            title,
            description,
            author,
            profileImage,
            readableDate,
            coverImage,
            canonical,
          }) => (
            <div className="py-4" key={title}>
              <div className="max-w-4xl mx-auto border rounded-md hover:shadow-md">
                <Link href={canonical}>
                  <a>
                    <img
                      src={coverImage}
                      className="object-cover w-full rounded-t-md"
                    />
                    <div className="p-4">
                      <h3>{title}</h3>
                      <p className="line-clamp-2 text-accent-darker">
                        {description}
                      </p>

                      <div className="inline-flex items-center mt-4 space-x-4">
                        <img src={profileImage} className="h-10 rounded-full" />
                        <p className="text-accent-dark">{author}</p>
                        <p className="text-accent-dark">{readableDate}</p>
                      </div>
                    </div>
                  </a>
                </Link>
              </div>
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
