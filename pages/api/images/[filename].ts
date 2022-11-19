import type { NextApiRequest, NextApiResponse } from 'next';
import { filenameToAtomicURL } from '../../../helpers/server/galleryItems';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { filename } = req.query;
  try {
    const result = await fetch(filenameToAtomicURL(filename as string))
      .then(atomicRes => atomicRes.arrayBuffer());
    res.setHeader('Content-Type', 'image/webp');
    res.setHeader('Cache-Control', 'max-age=31557600');

    res.status(200).send(Buffer.from(result));

    return;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);

    res.status(500).json({ error: 'Invalid filename' });
  }
}
