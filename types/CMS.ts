import { ValidIcon } from '../components/lib/Icon';

export interface CommunityLink {
  display: string;
  url: string;
  icon: ValidIcon;
};

export interface HomePageCMSBaseData {
  pageTitle: string;
  headerParagraph: string;
  communityHeading: string;
  communitySubtitle: string;
  communityMotmHeading: string;
  linksHeading: string;
  links: CommunityLink[];
}

export interface MotM {
  videoTitle: string;
  videoUrl: string;
  date: string;
}

export interface HomepageCMSResponse {
  data: {
    homepage: HomePageCMSBaseData;
    matchOfTheMonthCollection: {
      items: MotM[];
    };
  };
}

export type CMSData = HomePageCMSBaseData & { motm: MotM[]; };
