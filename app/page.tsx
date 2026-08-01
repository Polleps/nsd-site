import type { Metadata } from 'next';
import { Header } from '../components/Header';
import { Community } from '../components/Home/Community';
import { FeaturedTournament } from '../components/Home/FeaturedTournament';
import { Container } from '../components/lib/Container';
import { Socials } from '../components/Home/Socials';
import { fetchAllTournaments, fetchTournaments } from '../helpers/server/fetchTournaments';
import { getGalleryItems } from '../helpers/server/galleryItems';
import { HeaderData, headerQuery, HomePageData, homepageQuery, MotMData, motmQuery, queryBuilder } from '../helpers/server/cms';
import type { Tournament } from '../types/Tournament';
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

const isOnOrBeforeDay = (today: Date, deadline: Date): boolean => {
  const todayUTC = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  const deadlineUTC = Date.UTC(deadline.getUTCFullYear(), deadline.getUTCMonth(), deadline.getUTCDate());

  return todayUTC <= deadlineUTC;
};

const getFeaturedTournament = (
  tournaments: Tournament[],
  homepage: HomePageData[ 'homepage' ],
): Tournament | undefined => {
  if (!homepage.featuredTournament || !homepage.featuredTournamentDate) {
    return undefined;
  }

  if (!isOnOrBeforeDay(new Date(), new Date(homepage.featuredTournamentDate))) {
    return undefined;
  }

  return tournaments.find((tournament) => tournament.url === homepage.featuredTournament);
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
  const [ tournaments, allTournaments, initialGalleryItems, cmsData ] = await Promise.all([
    fetchTournaments(),
    fetchAllTournaments(),
    getGalleryItems(4),
    fetchHomeData(),
  ]);

  const featuredTournament = getFeaturedTournament(allTournaments, cmsData.homepage);

  return (
    <>
      <Header tournaments={tournaments} cmsData={cmsData} />
      <main>
        {featuredTournament && <FeaturedTournament tournament={featuredTournament} />}
        <Container size="large">
          <Community initialGalleryItems={initialGalleryItems} cmsData={cmsData} />
        </Container>
        <Socials cmsData={cmsData} />
      </main>
    </>
  );
}
