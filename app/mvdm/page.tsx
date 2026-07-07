import type { Metadata } from 'next';
import { Header } from '../../components/Header';
import { Container } from '../../components/lib/Container';
import { ArchiveList } from '../../components/motm/ArchiveList';
import { PrimaryMOTM } from '../../components/motm/PrimaryMOTM';
import { HeaderData, headerQuery, MotMData, motmQuery, queryBuilder } from '../../helpers/server/cms';
import { fetchTournaments } from '../../helpers/server/fetchTournaments';
import banner from '../../public/banner.webp';
import styles from './mvdm.module.css';

export const revalidate = 43200;

export const metadata: Metadata = {
  title: 'Match van de maand',
  description: 'Alles over de Nederlandse Smash community vind je hier. Van toernooien tot video\'s',
  openGraph: {
    images: [ banner.src ],
  },
};

const formatter = Intl.DateTimeFormat('nl-NL', {
  month: 'long',
});

export default async function MvdmPage() {
  const mvdmQuery = queryBuilder<HeaderData & MotMData>(headerQuery(), motmQuery());
  const [ tournaments, cmsData ] = await Promise.all([ fetchTournaments(), mvdmQuery.fetch() ]);
  const cMotm = cmsData.motm?.[ 0 ]!;

  return (
    <>
      <Header tournaments={tournaments} cmsData={cmsData} />
      <main>
        <Container className={styles.container}>
          <h2>Match van de maand {formatter.format(new Date(cMotm.date))}</h2>
          <PrimaryMOTM motm={cMotm} />
        </Container>
        <ArchiveList matches={cmsData.motm!} />
      </main>
    </>
  );
}
