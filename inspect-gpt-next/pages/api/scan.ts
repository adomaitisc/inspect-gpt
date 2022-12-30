import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // check for the paragraph array in the body
    if (!req.body.paragraphs) {
      res
        .status(400)
        .json({ message: "Bad request: paragraphs array is missing" });
      return;
    }

    // get array of data
    const data = req.body.paragraphs;

    // use the data onto the hugginface GPT-output detector to check for ai-text
    const results = await detectAiText(data);
    console.log(results);

    res.status(200).json({ results: results });
  } else {
    res.status(400).json({
      message: "Bad request: only POST method allowed on this endpoint",
    });
  }
}

async function detectAiText(data: string[]) {
  let results: string[] = [];
  // do it for each paragraph
  for (const paragraph of data) {
    // check for the ai-text
    const res = await fetch(
      `https://huggingface.co/openai-detector?${encodeURI(paragraph)}`,
      {
        method: "GET",
      }
    );
    const data = await res.json();
    results.push(data.fake_probability);
  }
  // return the result
  return results;
}
