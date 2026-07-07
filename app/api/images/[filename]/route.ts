import { filenameToAtomicURL } from '../../../../helpers/server/galleryItems';

export async function GET(request: Request, { params }: { params: Promise<{ filename: string; }>; }) {
  const { filename } = await params;

  try {
    const result = await fetch(filenameToAtomicURL(filename))
      .then((atomicRes) => atomicRes.arrayBuffer());

    return new Response(Buffer.from(result), {
      headers: {
        'Content-Type': 'image/webp',
        'Cache-Control': 'max-age=31557600',
      },
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);

    return Response.json({ error: 'Invalid filename' }, { status: 500 });
  }
}
