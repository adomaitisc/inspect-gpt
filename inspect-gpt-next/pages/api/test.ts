import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    res.status(200).json({ results: "test" });
  } else {
    res.status(400).json({
      message: "Bad request: only GET method allowed on this endpoint",
    });
  }
}
