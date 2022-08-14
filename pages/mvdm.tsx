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

interface MOTMProps {
  tournaments: Tournament[];
  cmsData: HeaderData & MotMData;
}

export const getServerSideProps: GetServerSideProps = async (): Promise<{ props: MOTMProps; }> => {
  const mvdmQuery = queryBuilder<MOTMProps['cmsData']>(
    headerQuery(),
    motmQuery(),
  );

  const [
    tournaments,
    cmsData,
  ] = await Promise.all([fetchTournaments(), mvdmQuery.fetch()]);

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
        { /*TODO: Add Description */}
        <meta name="description" content="TODO ADD DESCRIPTION" />
        <link rel="icon" href="/favicon.ico" />
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
