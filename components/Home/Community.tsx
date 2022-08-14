
import { HomePageData, MotMData } from '../../helpers/server/cms';
import { styled, theme } from '../../stitches.config';
import { Slot } from '../lib/Slot';
import { Video } from '../lib/Video';
import { Gallery } from './Gallery';

export interface CommunityProps {
  initialGalleryItems: string[];
  cmsData: HomePageData & MotMData;
}

const Wrapper = styled('div', {
  display: 'grid',
  gridTemplateAreas: '"title title" "gallery subtitle" "gallery video"',
  gridTemplateRows: 'auto 1.5fr 5.5fr',
  gridTemplateColumns: '1.5fr 1fr',
  height: '50rem',
  gap: theme.sizes.xl,
  marginTop: theme.sizes.xl,
  '@smDown': {
    gridTemplateAreas: '"title" "subtitle" "gallery" "video"',
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'unset',
    height: 'unset',
  },
});

const CommunityTitle = styled('h2', {
  textAlign: 'center',
  fontSize: theme.fontSizes.xLarge,
});

const VideoWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: theme.sizes.md,
});

const VideoHeading = styled('h3', {
  fontSize: theme.fontSizes.large,
});

export const Community: React.FC<CommunityProps> = ({initialGalleryItems, cmsData}) => (
  <Wrapper>
    <Slot area="title">
      <CommunityTitle>{cmsData.homepage.communityHeading}</CommunityTitle>
    </Slot>
    <Slot area="gallery">
      <Gallery initialGalleryItems={initialGalleryItems} />
    </Slot>
    <Slot area="subtitle">
      <p>{cmsData.homepage.communitySubtitle}</p>
    </Slot>
    <Slot area="video">
      <VideoWrapper>
        <VideoHeading>{cmsData.homepage.communityMotmHeading}</VideoHeading>
        <span>{cmsData.motm?.[0].videoTitle}</span>
        <Video
          ytSrc={cmsData.motm?.[0].videoUrl!}
          title={cmsData.motm?.[0].videoTitle!}
        />
      </VideoWrapper>
    </Slot>
  </Wrapper>
);
