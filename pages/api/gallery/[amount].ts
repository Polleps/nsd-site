import type { NextApiRequest, NextApiResponse } from 'next';
import { getGalleryItems } from '../../../helpers/server/galleryItems';

type ResponseData = {
  paths: string[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { amount } = req.query;
  const items = await getGalleryItems(parseInt(amount as string));

  res.status(200).json({ paths: items });
}
