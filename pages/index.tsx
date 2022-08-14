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

interface HomepageProps {
  tournaments: Tournament[];
  initialGalleryItems: string[];
  cmsData: HomePageData & HeaderData & MotMData;
}

export const getServerSideProps: GetServerSideProps = async (): Promise<{ props: HomepageProps; }> => {
  const homeQuery = queryBuilder<HomepageProps['cmsData']>(
    homepageQuery(),
    headerQuery(),
    motmQuery(1),
  );

  const [
    filteredTournaments,
    initialGalleryItems,
    cmsData,
  ] = await Promise.all([fetchTournaments(), getGalleryItems(4), homeQuery.fetch()]);

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
        { /*TODO: Add Description */}
        <meta name="description" content="TODO ADD DESCRIPTION" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header tournaments={tournaments} cmsData={cmsData} />
      <main>
        <Container size="large">
          <Community initialGalleryItems={initialGalleryItems} cmsData={cmsData} />
        </Container>
        <Socials cmsData={cmsData}/>
      </main>
    </>
  );
};

export default Home;
