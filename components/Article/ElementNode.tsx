import React from 'react';
import { AssetNode, NodeType, PossibleNode } from '../../types/article';
import { AssetRenderNode } from './AssetRenderNode';

export interface ElementNodeProps {
  node: PossibleNode;
}

const elementMap = new Map<NodeType, React.ReactNode | (keyof JSX.IntrinsicElements)>([
  [ NodeType.Heading1, 'h2' ],
  [ NodeType.Heading2, 'h3' ],
  [ NodeType.P, 'p' ],
  [ NodeType.Text, React.Fragment ],
  [ NodeType.Li, 'li' ],
  [ NodeType.Ol, 'ol' ],
  [ NodeType.Ul, 'ul' ],
  [ NodeType.Hyperlink, 'a' ],
]);

export const ElementNode: React.FC<React.PropsWithChildren<ElementNodeProps>> = ({
  node,
}) => {
  if (node.nodeType === NodeType.Asset) {
    return <AssetRenderNode node={node as AssetNode} />;
  }

  const Element = elementMap.get(node.nodeType) ?? 'span';
  const props = {};

  if (Element === 'a') {
    // @ts-ignore
    props.href = node.data.uri;
  }

  return (
    // @ts-ignore
    <Element {...props}>
      {node.value !== undefined && node.value}
      {node.content !== undefined && node.content.map((n, i) => (
        <ElementNode node={n} key={i} />
      ))}
    </Element>
  );
};
