'use client';

import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';
import styles from './GalleryItem.module.css';

export interface GalleryItemProps {
  src: string;
}

export const GalleryItem: React.FC<GalleryItemProps> = ({ src }) => {
  const [ prevImg, setPrevImg ] = useState<string>();
  const [ opacity, setOpacity ] = useState(0);

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
    <div className={styles.imageWrapper} style={{ '--galleryItemOpacity': opacity } as CSSProperties}>
      {prevImg && (
        <img className={styles.image} src={prevImg} alt="" />
      )}
      <img
        className={styles.image}
        src={src}
        alt="een Nederlands smash toernooi"
      />
    </div>
  );
};
