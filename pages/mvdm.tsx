import Head from 'next/head';
import { GetServerSideProps, NextPage } from 'next/types';
import { Header } from '../components/Header';
import { Container } from '../components/lib/Container';
import { ArchiveList } from '../components/motm/ArchiveList';
import { PrimaryMOTM } from '../components/motm/PrimaryMOTM';
import { HeaderData, headerQuery, MotMData, motmQuery, queryBuilder } from '../helpers/server/cms';
import { fetchTournaments } from '../helpers/server/fetchTournaments';
import { styled, theme } from '../stitches.config';
import { Tournament } from '../types/Tournament';
import banner from '../public/banner.webp';

interface MOTMProps {
  tournaments: Tournament[];
  cmsData: HeaderData & MotMData;
}

export const getServerSideProps: GetServerSideProps = async ({ res }): Promise<{ props: MOTMProps; }> => {
  res.setHeader('Cache-Control', 'max-age=43200, stale-while-revalidate=21600');

  const mvdmQuery = queryBuilder<MOTMProps[ 'cmsData' ]>(
    headerQuery(),
    motmQuery(),
  );

  const [
    tournaments,
    cmsData,
  ] = await Promise.all([ fetchTournaments(), mvdmQuery.fetch() ]);

  return {
    props: {
      tournaments,
      cmsData,
    },
  };
};

const formatter = Intl.DateTimeFormat('nl-NL', {
  month: 'long',
});

const MOTM: NextPage<MOTMProps> = ({ tournaments, cmsData }: MOTMProps) => {
  const cMotm = cmsData.motm?.[ 0 ]!;

  return (
    <>
      <Head>
        <title>Match van de maand</title>
        <meta name="description" content="Alles over de Nederlandse Smash community vind je hier. Van toernooien tot video's" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content={banner.src} />
      </Head>
      <Header tournaments={tournaments} cmsData={cmsData} />
      <main>
        <StyledContainer>
          <h2>Match van de maand {formatter.format(new Date(cMotm.date))}</h2>
          <PrimaryMOTM
            motm={cMotm}
          />
        </StyledContainer>
        <ArchiveList matches={cmsData.motm!} />
      </main>
    </>
  );
};

export default MOTM;

const StyledContainer = styled(Container, {
  marginTop: theme.sizes.md,
  display: 'flex',
  textAlign: 'center',
  flexDirection: 'column',
  gap: theme.sizes.md,
});
