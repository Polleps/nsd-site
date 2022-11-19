import Head from 'next/head';
import { GetServerSideProps, NextPage } from 'next/types';
import { ArticleViewer } from '../../components/Article';
import { Article } from '../../types/article';
import { Header } from '../../components/Header';
import { Container } from '../../components/lib/Container';
import { fetchArticle, HeaderData, headerQuery, queryBuilder } from '../../helpers/server/cms';
import { fetchTournaments } from '../../helpers/server/fetchTournaments';
import { styled, theme } from '../../stitches.config';
import { Tournament } from '../../types/Tournament';
import { ServerResponse } from 'http';
import { Error } from '../../components/Error';

type ArticlesProps = {
  tournaments: Tournament[];
  cmsData: HeaderData;
  article: Article;
  errorCode?: number;
};

const show404 = (res: ServerResponse) => {
  res.statusCode = 404;

  return {
    props: { errorCode: 404 },
  };
};

export const getServerSideProps: GetServerSideProps<{}, { id: string; }> = async ({ params, res }): Promise<{ props: ArticlesProps | { errorCode: number; }; }> => {
  if (!params || !params.id) {
    return show404(res);
  }

  const fetchHeaderData = queryBuilder<ArticlesProps[ 'cmsData' ]>(
    headerQuery(),
  );

  const [
    tournaments,
    cmsData,
    article,
  ] = await Promise.all([ fetchTournaments(), fetchHeaderData.fetch(), fetchArticle(params.id) ]);

  if (!article) {
    res.statusCode = 404;

    return {
      props: { errorCode: 404 },
    };
  }

  res.setHeader('Cache-Control', 'max-age=43200, stale-while-revalidate=21600');

  return {
    props: {
      tournaments,
      cmsData,
      article: article as Article,
    },
  };
};

const MOTM: NextPage<ArticlesProps> = ({ errorCode, tournaments, cmsData, article }: ArticlesProps) => {

  if (errorCode) {
    return <Error code={404} title="Pagina niet gevonden">
      <p>De pagina die je probeert te bezoeken bestaat niet.</p>
    </Error>;
  }

  return (
    <>
      <Head>
        <title>{article.title}</title>
        <meta name="description" content={article.description} />
        <meta property="og:image" content={article.thumbnail.url} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header tournaments={tournaments} cmsData={cmsData} />
      <main>
        <StyledContainer>
          <ArticleViewer article={article} />
        </StyledContainer>
      </main>
    </>
  );
};

export default MOTM;

const StyledContainer = styled(Container, {
  marginTop: theme.sizes.xl,
  display: 'flex',
  textAlign: 'center',
  flexDirection: 'column',
  gap: theme.sizes.md,
});
