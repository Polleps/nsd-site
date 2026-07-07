import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleViewer } from '../../../components/Article';
import { Header } from '../../../components/Header';
import { Container } from '../../../components/lib/Container';
import { fetchArticle, HeaderData, headerQuery, queryBuilder } from '../../../helpers/server/cms';
import { fetchTournaments } from '../../../helpers/server/fetchTournaments';
import type { Article } from '../../../types/article';
import styles from './articles-id.module.css';

interface ArticlesIdPageProps {
  params: Promise<{ id: string }>;
}

const fetchArticleData = async (id: string) => {
  const article = await fetchArticle(id);

  if (!article) {
    notFound();
  }

  return article as Article;
};

export const revalidate = 43200;

export const generateMetadata = async ({ params }: ArticlesIdPageProps): Promise<Metadata> => {
  const { id } = await params;
  const article = await fetchArticleData(id);

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      images: [ article.thumbnail.url ],
    },
  };
};

export default async function ArticlePage({ params }: ArticlesIdPageProps) {
  const { id } = await params;

  const fetchHeaderData = queryBuilder<HeaderData>(headerQuery());

  const [ tournaments, cmsData, article ] = await Promise.all([
    fetchTournaments(),
    fetchHeaderData.fetch(),
    fetchArticleData(id),
  ]);

  return (
    <>
      <Header tournaments={tournaments} cmsData={cmsData} />
      <main>
        <Container className={styles.container}>
          <ArticleViewer article={article} />
        </Container>
      </main>
    </>
  );
}
