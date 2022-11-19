import React from 'react';
import { styled, theme } from '../../stitches.config';
import { AssetNode } from '../../types/article';
import { useAssetUrl } from './ArticleContextProvider';

export interface AssetRenderNodeProps {
  node: AssetNode;
}

export const AssetRenderNode: React.FC<React.PropsWithChildren<AssetRenderNodeProps>> = ({ node }) => {
  const id = node.data.target.sys.id;
  const url = useAssetUrl(id);

  return (
    <StyledImage src={url} alt="" loading="lazy" />
  );
};

const StyledImage = styled('img', {
  width: '100%',
  borderRadius: theme.radii.main,
  marginBottom: theme.sizes.md,
});
