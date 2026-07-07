import { getGalleryItems } from '../../../../helpers/server/galleryItems';

export async function GET(request: Request, { params }: { params: Promise<{ amount: string; }>; }) {
  const { amount } = await params;
  const items = await getGalleryItems(parseInt(amount));

  return Response.json({ paths: items });
}
