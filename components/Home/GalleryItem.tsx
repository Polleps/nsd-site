import React, { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import NextImage from 'next/image';
import { styled, theme } from '../../stitches.config';
import { createVars } from '../../helpers/createVars';

export interface GalleryItemProps {
  src: string;
}

const RESOLUTION = 800;

const ImageWrapper = styled('span', {
  position: 'relative',
  '& img': {
    borderRadius: theme.radii.main,
    objectFit: 'cover',
  },
  '& *:last-child img': {
    opacity: 'var(--galleryItemOpacity, 0)',
    transition: 'opacity 0.5s ease-in-out',
  },
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
        <NextImage
          src={prevImg}
          layout="fill"
          width={RESOLUTION}
          height={RESOLUTION}
          alt="een Nederlands smash toernooi"
      />
      )}
      <NextImage
        src={src}
        layout="fill"
        width={RESOLUTION}
        height={RESOLUTION}
        alt="een Nederlands smash toernooi"
      />
    </ImageWrapper>
  );
};
