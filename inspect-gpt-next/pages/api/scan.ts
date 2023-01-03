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

    // caclulate the average
    let sum = 0;
    for (const result of results) {
      sum += result;
    }
    const average = sum / results.length;

    // get highest probability
    const highest = Math.max(...results);

    // get amount of paragraphs that have >50% fake probability
    const amount = results.filter((result) => result > 0.5).length;

    // get amount of paragraphs
    const total = results.length;

    res
      .status(200)
      .json({ results: results, scan: { average, highest, amount, total } });
  } else {
    res.status(400).json({
      message: "Bad request: only POST method allowed on this endpoint",
    });
  }
}

async function detectAiText(data: string[]) {
  let results: number[] = [];
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
    results.push(parseFloat(data.fake_probability));
  }
  // return the result
  return results;
}
