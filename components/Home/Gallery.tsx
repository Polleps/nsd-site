import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { styled, theme } from '../../stitches.config';
import { GalleryItem } from './GalleryItem';

export interface GalleryProps {
  initialGalleryItems: string[];
}

const MIN_TIME = 5;
const MAX_TIME = 10;

const Wrapper = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: theme.sizes.lg,
  height: '100%',
});

const fetchImage = async (items: string[]): Promise<string> => {
  const { paths }: { paths: string[]; } = await fetch('api/gallery/1').then((res) => res.json());
  const [ image ] = paths;

  return !items.includes(image)
    ? Promise.resolve(image)
    : fetchImage(items);
};

const fetchAndUpdate = async (index: number, setter: React.Dispatch<React.SetStateAction<string[]>>, images: string[]): Promise<void> => {
  const image = await fetchImage(images);

  setter((prev) => {
    const clone = [ ...prev ];
    clone[ index ] = image;

    return clone;
  });
};

export const Gallery: React.FC<GalleryProps> = ({ initialGalleryItems }) => {
  const [ items, setItems ] = useState(initialGalleryItems);

  useEffect(() => {
    const randomTime = Math.floor(Math.random() * (MAX_TIME - MIN_TIME) + MIN_TIME);
    const id = setTimeout(() => {
      const index = Math.floor(Math.random() * items.length);

      fetchAndUpdate(index, setItems, items);
    }, randomTime * 1000);

    return () => {
      clearTimeout(id);
    };
  }, [ items ]);

  return (
    <Wrapper>
      <GalleryItem src={items[ 0 ]} />
      <GalleryItem src={items[ 1 ]} />
      <GalleryItem src={items[ 2 ]} />
      <GalleryItem src={items[ 3 ]} />
    </Wrapper>
  );
};
