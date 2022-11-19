import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { Header } from '../components/Header';
import { Community } from '../components/Home/Community';
import { Container } from '../components/lib/Container';
import { Socials } from '../components/Home/Socials/index';
import { fetchTournaments } from '../helpers/server/fetchTournaments';
import { getGalleryItems } from '../helpers/server/galleryItems';
import { HeaderData, headerQuery, HomePageData, homepageQuery, MotMData, motmQuery, queryBuilder } from '../helpers/server/cms';
import { Tournament } from '../types/Tournament';
import banner from '../public/banner.webp';

interface HomepageProps {
  tournaments: Tournament[];
  initialGalleryItems: string[];
  cmsData: HomePageData & HeaderData & MotMData;
}

export const getServerSideProps: GetServerSideProps = async ({ res }): Promise<{ props: HomepageProps; }> => {
  res.setHeader('Cache-Control', 'max-age=43200, stale-while-revalidate=21600');
  const homeQuery = queryBuilder<HomepageProps[ 'cmsData' ]>(
    homepageQuery(),
    headerQuery(),
    motmQuery(1),
  );

  const [
    filteredTournaments,
    initialGalleryItems,
    cmsData,
  ] = await Promise.all([ fetchTournaments(), getGalleryItems(4), homeQuery.fetch() ]);

  return {
    props: {
      tournaments: filteredTournaments,
      initialGalleryItems,
      cmsData,
    },
  };
};

const Home: NextPage<HomepageProps> = ({ tournaments, initialGalleryItems, cmsData }) => {
  return (
    <>
      <Head>
        <title>{cmsData.header.pageTitle}</title>
        <meta name="description" content="Alles over de Nederlandse Smash community vind je hier. Van toernooien tot video's" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content={banner.src} />
        <meta />
      </Head>
      <Header tournaments={tournaments} cmsData={cmsData} />
      <main>
        <Container size="large">
          <Community initialGalleryItems={initialGalleryItems} cmsData={cmsData} />
        </Container>
        <Socials cmsData={cmsData} />
      </main>
    </>
  );
};

export default Home;
