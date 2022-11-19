import Head from 'next/head';
import { GetServerSideProps, NextPage } from 'next/types';
import { Header } from '../../components/Header';
import { Container } from '../../components/lib/Container';
import { fetchArticles, HeaderData, headerQuery, queryBuilder } from '../../helpers/server/cms';
import { fetchTournaments } from '../../helpers/server/fetchTournaments';
import { styled, theme } from '../../stitches.config';
import { Tournament } from '../../types/Tournament';
import { ArticleMeta } from '../../types/CMS';
import { Card } from '../../components/lib/Card';
import banner from '../../public/banner.webp';

interface ArticlesProps {
  tournaments: Tournament[];
  cmsData: HeaderData;
  articles: ArticleMeta[];
}

export const getServerSideProps: GetServerSideProps = async ({ res }): Promise<{ props: ArticlesProps; }> => {
  res.setHeader('Cache-Control', 'max-age=43200, stale-while-revalidate=21600');
  const mvdmQuery = queryBuilder<ArticlesProps[ 'cmsData' ]>(
    headerQuery(),
  );

  const [
    tournaments,
    cmsData,
    articles,
  ] = await Promise.all([ fetchTournaments(), mvdmQuery.fetch(), fetchArticles() ]);

  return {
    props: {
      tournaments,
      cmsData,
      articles,
    },
  };
};

const MOTM: NextPage<ArticlesProps> = ({ tournaments, cmsData, articles }: ArticlesProps) => {

  return (
    <>
      <Head>
        <title>Tips & Tricks</title>
        <meta name="description" content="Alles over de Nederlandse Smash community vind je hier. Van toernooien tot video's" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content={banner.src} />
      </Head>
      <Header tournaments={tournaments} cmsData={cmsData} />
      <main>
        <StyledContainer>
          <h1>Tips & Tricks</h1>
          <ul>
            {articles.map((article) => (
              <li key={article.sys.id}>
                <a href={`/articles/${article.sys.id}`}>
                  <ItemCard interaction>
                    <Thumbnail src={article.thumbnail?.url} alt="" />
                    <Title>{article.title}</Title>
                    <Description>{article.description}</Description>
                  </ItemCard>
                </a>
              </li>
            ))}
          </ul>
        </StyledContainer>
      </main>
    </>
  );
};

export default MOTM;

const StyledContainer = styled(Container, {
  marginBlock: theme.sizes.xl,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.sizes.md,
});

const ItemCard = styled(Card, {
  display: 'grid',
  gridTemplateColumns: '1fr 3fr',
  gridTemplateAreas: '"image title" "image description"',
  height: '10rem',
  overflow: 'hidden',
  gap: theme.sizes.md,
  padding: '1rem',
});

const Thumbnail = styled('img', {
  gridArea: 'image',
  width: '100%',
  height: '10rem',
  objectFit: 'cover',
  margin: '-1rem',
});

const Title = styled('h2', {
  gridArea: 'title',
});

const Description = styled('p', {
  gridArea: 'description',
  color: theme.colors.textLight,
});
