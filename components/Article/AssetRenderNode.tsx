'use client';

import type { AssetNode } from '../../types/article';
import { useAssetUrl } from './ArticleContextProvider';
import styles from './AssetRenderNode.module.css';

export interface AssetRenderNodeProps {
  node: AssetNode;
}

export const AssetRenderNode: React.FC<AssetRenderNodeProps> = ({ node }) => {
  const id = node.data.target.sys.id;
  const url = useAssetUrl(id);

  return (
    <img className={styles.image} src={url} alt="" loading="lazy" />
  );
};
