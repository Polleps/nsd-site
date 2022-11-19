import fs from 'fs';

const IMAGE_BASE_PATH = 'public/gallery';

const getAllImages = async (): Promise<string[]> => {
  const images = await fs.promises.readdir(IMAGE_BASE_PATH);

  return images.map((image) => `/gallery/${image}`);
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
