import type { CMSData, HomepageCMSResponse } from '../../types/CMS';
import { Exists, pick } from '../obj';

const CMS_URL = process.env.CMS_URL!;
const CMS_TOKEN = process.env.CMS_ACCESS_TOKEN!;
const HOMEPAGE_ID = process.env.CMS_HOMEPAGE_ID!;

type Query<T extends Record<string, unknown> = Record<string, unknown>> = {
  query: string,
  variables: Record<string, string>,
  transform: (data: Partial<CMSData>) => T;
};

type TransformerPick<K extends keyof CMSData> = Exists<Pick<Partial<CMSData>, K>>

export type HeaderQuery = Query<{
  header: TransformerPick<'pageTitle' | 'headerParagraph'>;
}>;

export type HeaderData = ReturnType<HeaderQuery['transform']>;

export type HomePageQuery = Query<{
  homepage: TransformerPick<'communityHeading' |
    'communitySubtitle' |
    'communityMotmHeading' |
    'linksHeading' |
    'links'>;
}>;
export type HomePageData = ReturnType<HomePageQuery['transform']>;

export type MotMQuery = Query<TransformerPick<'motm'>>;
export type MotMData = ReturnType<MotMQuery['transform']>;

type PossibleQueries = HeaderQuery | HomePageQuery | MotMQuery;
const fetchData = async <T>(query: string, variables?: Record<string, string>): Promise<T> =>
  fetch(CMS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${CMS_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  }).then((response) => response.json() as Promise<T>);

const mergeQueries = (queries: PossibleQueries[]) => queries
  .reduce((acc, c) => ({
  query: acc.query + c.query,
  variables: { ...acc.variables, ...c.variables },
  transform: (data: Partial<CMSData>) => ({
    ...acc.transform(data),
    ...c.transform(data),
  }),
  }),  {
    query: '',
    variables: {},
    transform: (data: Partial<CMSData>) => ({}),
});

export const queryBuilder = <T>(...queries: PossibleQueries[]) => {
  const { query, variables, transform } = mergeQueries(queries);


  const fullQuery = `query($id: String!) { ${query} }`;

  return {
    async fetch() {
      const response = await fetchData<Partial<HomepageCMSResponse>>(fullQuery, variables);
      const data = {
        ...response?.data?.homepage,
        motm: response?.data?.matchOfTheMonthCollection?.items,
      };

      return transform(data) as T;
    },
  };
};

export const headerQuery = (): HeaderQuery => ({
  query: `
    homepage(id: $id) {
      pageTitle,
      headerParagraph,
    }
  `,
  variables: { id: HOMEPAGE_ID },
  transform: (data) => ({
    header: pick(data, 'pageTitle', 'headerParagraph'),
  }),
});

export const homepageQuery = (): HomePageQuery => ({
  query: `
    homepage(id: $id) {
      communityHeading,
      communitySubtitle,
      communityMotmHeading,
      linksHeading,
      links
    }
  `,
  variables: { id: HOMEPAGE_ID },
  transform: (data) => ({
    homepage: pick(
      data,
      'communityHeading',
      'communitySubtitle',
      'communityMotmHeading',
      'linksHeading',
      'links',
    ),
  }),
});

export const motmQuery = (limit?: number): MotMQuery => ({
  query: `
    matchOfTheMonthCollection(${limit ? `limit: ${limit}` : ''}, order: [date_DESC]) {
      items {
        videoTitle
        videoUrl
        date
      }
    }
  `,
  variables: {},
  transform: (data) => pick(data, 'motm'),
});
