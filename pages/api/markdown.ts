import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import matter from 'gray-matter';

export default async function markdown(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const markdown = fs.readFileSync(
      path.resolve(`__post/${req.query.markdown}`)
    );
    const formatObj = matter(markdown);
    const file = await remark().use(remarkHtml).process(formatObj.content);
    const result = {
      markdown: file.value,
      parsed: formatObj,
    };
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send(e);
  }
}
