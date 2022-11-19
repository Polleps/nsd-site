import fs from 'fs';
import path from 'path';

const IMAGE_BASE_PATH = process.env.NODE_ENV === 'development'
  ? 'public/gallery'
  : path.join(process.cwd(), 'gallery');

const buildCollectionSubject = (): string => {
  const subject = new URL('https://atomicdata.dev/collections');
  const searchParams = new URLSearchParams({
    property: 'https://atomicdata.dev/properties/parent',
    value: process.env.GALLERY_FOLDER_SUBJECT!,
    page_size: '100',
  });

  subject.search = searchParams.toString();

  return subject.toString();
};

const getAllImages = async (): Promise<string[]> => {
  try {
    const collection = await fetch(buildCollectionSubject(), {
      headers: {
        Accept: 'application/json',
      },
    }).then(res => res.json());

    const images: Array<string | undefined> = collection.members?.map((member: Record<string, string>) => member[ 'https://atomicdata.dev/properties/downloadURL' ]);

    return images.filter(i => i !== undefined) as string[];
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);

    return [];
  }
};

export const getGalleryItems = async (amount: number): Promise<string[]> => {
  const allImages = await getAllImages();
  const images: string[] = [];

  for (let i = 0; i < amount; i++) {
    const randomIndex = Math.floor(Math.random() * allImages.length);
    const [ randomImage ] = allImages.splice(randomIndex, 1);

    images.push(randomImage);
  }

  return images;
};
