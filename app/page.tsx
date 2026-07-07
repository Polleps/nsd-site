import type { Metadata } from 'next';
import { Header } from '../components/Header';
import { Community } from '../components/Home/Community';
import { Container } from '../components/lib/Container';
import { Socials } from '../components/Home/Socials';
import { fetchTournaments } from '../helpers/server/fetchTournaments';
import { getGalleryItems } from '../helpers/server/galleryItems';
import { HeaderData, headerQuery, HomePageData, homepageQuery, MotMData, motmQuery, queryBuilder } from '../helpers/server/cms';
import banner from '../public/banner.webp';

export const revalidate = 43200;

type HomeCmsData = HomePageData & HeaderData & MotMData;

const fetchHomeData = (): Promise<HomeCmsData> => {
  const homeQuery = queryBuilder<HomeCmsData>(
    homepageQuery(),
    headerQuery(),
    motmQuery(1),
  );

  return homeQuery.fetch();
};

export const generateMetadata = async (): Promise<Metadata> => {
  const cmsData = await fetchHomeData();

  return {
    title: cmsData.header.pageTitle,
    description: 'Alles over de Nederlandse Smash community vind je hier. Van toernooien tot video\'s',
    openGraph: {
      images: [ banner.src ],
    },
  };
};

export default async function Home() {
  const [ tournaments, initialGalleryItems, cmsData ] = await Promise.all([
    fetchTournaments(),
    getGalleryItems(4),
    fetchHomeData(),
  ]);

  return (
    <>
      <Header tournaments={tournaments} cmsData={cmsData} />
      <main>
        <Container size="large">
          <Community initialGalleryItems={initialGalleryItems} cmsData={cmsData} />
        </Container>
        <Socials cmsData={cmsData} />
      </main>
    </>
  );
}
