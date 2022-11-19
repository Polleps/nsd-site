import React, { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { styled, theme } from '../../stitches.config';
import { createVars } from '../../helpers/createVars';

export interface GalleryItemProps {
  src: string;
}

const ImageWrapper = styled('div', {
  position: 'relative',
  height: '100%',
  maxHeight: '100%',

  '& img:last-child': {
    opacity: 'var(--galleryItemOpacity, 0)',
    transition: 'opacity 0.5s ease-in-out',
    position: 'absolute',
    inset: '0',
  },
});

const Image = styled('img', {
  borderRadius: theme.radii.main,
  objectFit: 'cover',
  width: '100%',
  height: '100%',
});

export const GalleryItem: React.FC<GalleryItemProps> = ({ src }) => {
  const [ prevImg, setPrevImg ] = useState<string>();
  const [ style, setOpacity ] = useReducer((_: any, galleryItemOpacity: number) => createVars({ galleryItemOpacity }), {});

  useEffect(() => {
    setOpacity(1);
    const handle = setTimeout(() => {
      setPrevImg(src);
      setOpacity(0);
    }, 1000);

    return () => {
      clearTimeout(handle);
    };
  }, [ src ]);

  return (
    <ImageWrapper css={style}>
      {prevImg && (
        <Image src={prevImg} alt="" />
      )}
      <Image
        src={src}
        alt="een Nederlands smash toernooi"
      />
    </ImageWrapper>
  );
};
