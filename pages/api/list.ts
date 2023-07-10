import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function markdown(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const dir = path.resolve('__post');
    const filenames = fs.readdirSync(dir);

    res.status(200).json(filenames);
  } catch (e) {
    res.status(500).send(e);
  }
}
