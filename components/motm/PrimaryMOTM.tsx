import type { MotM } from '../../types/CMS';
import { Video } from '../lib/Video';

interface PrimaryMOTMProps {
  motm: MotM;
}

export const PrimaryMOTM: React.FC<PrimaryMOTMProps> = ({ motm }) => {

  return (
    <>
      <p>{motm.videoTitle}</p>
      <Video
        ytSrc={motm.videoUrl}
        title={motm.videoTitle}
      />
    </>
  );
};
