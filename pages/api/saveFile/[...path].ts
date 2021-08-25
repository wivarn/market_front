import { NextApiRequest, NextApiResponse } from "next-auth/internals/utils";
import { appendFileSync, mkdirSync, readFileSync } from "fs";

import { IncomingForm } from "formidable";
import { dirname } from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (process.env.NEXT_PUBLIC_VERCEL_URL) return res.status(404).json("");
  const path =
    "public/" +
    (typeof req.query.path == "string"
      ? req.query.path
      : req.query.path.join("/"));
  const data: any = await new Promise((resolve, reject) => {
    const form = new IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

  const contents = readFileSync(data?.files?.file.path);
  mkdirSync(dirname(path), { recursive: true });
  appendFileSync(path, contents, { flag: "w" });
  return res.status(201).json("");
}

export const config = {
  api: {
    bodyParser: false,
  },
};
