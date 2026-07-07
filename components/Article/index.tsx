import type { ReactElement } from 'react';
import type { Article } from '../../types/article';
import { ArticleContextProvider } from './ArticleContextProvider';
import { ElementNode } from './ElementNode';
import styles from './Article.module.css';

export interface ArticleViewer {
  article: Article;
}

export const ArticleViewer = ({ article }: ArticleViewer): ReactElement => {
  const nodes = article.content.json.content;

  return (
    <ArticleContextProvider article={article}>
      <article className={styles.article}>
        {nodes.map((node, i) => (
          <ElementNode node={node} key={i} />
        ))}
      </article>
    </ArticleContextProvider>
  );
};
