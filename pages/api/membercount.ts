import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  count: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const result = await fetch('https://pgksmash.nl/serverinfo/membercount').then(res => res.json());
  res.status(200).json(result);
}
