import type { Metadata } from 'next';
import { Header } from '../../components/Header';
import { Container } from '../../components/lib/Container';
import { Card } from '../../components/lib/Card';
import { fetchArticles, HeaderData, headerQuery, queryBuilder } from '../../helpers/server/cms';
import { fetchTournaments } from '../../helpers/server/fetchTournaments';
import banner from '../../public/banner.webp';
import styles from './articles.module.css';

export const revalidate = 43200;

export const metadata: Metadata = {
  title: 'Tips & Tricks',
  description: 'Alles over de Nederlandse Smash community vind je hier. Van toernooien tot video\'s',
  openGraph: {
    images: [ banner.src ],
  },
};

export default async function ArticlesPage() {
  const headerDataQuery = queryBuilder<HeaderData>(headerQuery());

  const [ tournaments, cmsData, articles ] = await Promise.all([
    fetchTournaments(),
    headerDataQuery.fetch(),
    fetchArticles(),
  ]);

  return (
    <>
      <Header tournaments={tournaments} cmsData={cmsData} />
      <main>
        <Container className={styles.container}>
          <h1>Tips & Tricks</h1>
          <ul>
            {articles.map((article) => (
              <li key={article.sys.id}>
                <a href={`/articles/${article.sys.id}`}>
                  <Card className={styles.itemCard} interaction>
                    <img className={styles.thumbnail} src={article.thumbnail?.url} alt="" />
                    <h2 className={styles.title}>{article.title}</h2>
                    <p className={styles.description}>{article.description}</p>
                  </Card>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </main>
    </>
  );
}
