import React from 'react';
import { Article } from '../../types/article';

type Block = {
  sys: {
    id: string,
  },
  url: string,
};

export interface ArticleContext {
  links: {
    assets: {
      block: Block[],
    },
  },
  getUrlById: (id: string) => string;
}

export const ArticleContext = React.createContext<ArticleContext>({
  links: {
    assets: {
      block: [],
    },
  },
  getUrlById: () => '',
},);

export interface ArticleContextProviderProps {
  article: Article;
}

export const ArticleContextProvider = ({ article, children }: React.PropsWithChildren<ArticleContextProviderProps>) => {
  const getUrlById = React.useCallback((id: string) => {
    const block = article.content.links.assets.block.find(b => b.sys.id === id);

    return block?.url ?? '';
  }, [ article ]);

  const providerValue = React.useMemo(() => ({
    links: article.content.links,
    getUrlById,
  }), [ article, getUrlById ]);

  return (
    <ArticleContext.Provider value={providerValue}>
      {children}
    </ArticleContext.Provider>
  );
};

export const useAssetUrl = (id: string) => {
  const { getUrlById } = React.useContext(ArticleContext);

  return getUrlById(id);
};
