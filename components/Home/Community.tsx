import type { HomePageData, MotMData } from '../../helpers/server/cms';
import { Slot } from '../lib/Slot';
import { Video } from '../lib/Video';
import { Gallery } from './Gallery';
import styles from './Community.module.css';

export interface CommunityProps {
  initialGalleryItems: string[];
  cmsData: HomePageData & MotMData;
}

export const Community: React.FC<CommunityProps> = ({ initialGalleryItems, cmsData }) => (
  <div className={styles.wrapper}>
    <Slot area="title">
      <h2 className={styles.communityTitle}>{cmsData.homepage.communityHeading}</h2>
    </Slot>
    <Slot area="subtitle">
      <p className={styles.subtitle}>{cmsData.homepage.communitySubtitle}</p>
    </Slot>
    <Slot area="gallery">
      <Gallery initialGalleryItems={initialGalleryItems} />
    </Slot>
    <Slot area="video">
      <div className={styles.videoWrapper}>
        <h3 className={styles.videoHeading}>{cmsData.homepage.communityMotmHeading}</h3>
        <span>{cmsData.motm?.[ 0 ].videoTitle}</span>
        <Video
          ytSrc={cmsData.motm?.[ 0 ].videoUrl!}
          title={cmsData.motm?.[ 0 ].videoTitle!}
        />
      </div>
    </Slot>
  </div>
);
