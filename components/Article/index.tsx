import { styled, theme } from '../../stitches.config';
import { ElementNode } from './ElementNode';
import { Article } from '../../types/article';
import { ArticleContextProvider } from './ArticleContextProvider';

export interface ArticleViewer {
  article: Article;
}

export const ArticleViewer = ({ article }: ArticleViewer): JSX.Element => {
  const nodes = article.content.json.content;

  return (
    <ArticleContextProvider article={article}>
      <StyledArticle>
        {nodes.map((node, i) => (
          <ElementNode node={node} key={i} />
        ))}
      </StyledArticle>
    </ArticleContextProvider>
  );
};

const StyledArticle = styled('article', {
  textAlign: 'left',
  fontSize: '1.1rem',
  marginBottom: '5rem',
  '& p, & h2, & h3': {
    marginBottom: '1rem',
  },
  '& ol, & ul': {
    marginLeft: '1rem',
    listStyle: 'disc',
  },
  '& li:not(:last-of-type) > p': {
    marginBottom: 0,
  },
  '& a': {
    color: theme.colors.secondary,
    '&:hover, &:focus': {
      textDecoration: 'underline',
    },
  },
});
