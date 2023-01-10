import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log("Received POST request on /api/scan");

    // check for the paragraph array in the body
    if (!req.body.paragraphs) {
      res
        .status(400)
        .json({ message: "Bad request: paragraphs array is missing" });
      console.log("Bad request: paragraphs array is missing");
      return;
    }

    // get array of data
    const cleanedParagraphs = sanitizeParagraphs(req.body.paragraphs);

    // use the data onto the hugginface GPT-output detector to check for ai-text
    const results = await getProbabilityArray(cleanedParagraphs);

    // get highest probability
    const highest = Math.max(...results);

    // get amount of paragraphs that have >50% fake probability
    const amount = results.filter((result) => result > 0.5).length;

    // get amount of paragraphs
    const total = results.length;

    res.status(200).json({
      results: results,
      scan: { highest, amount, total },
    });
  } else {
    res.status(400).json({
      message: "Bad request: only POST method allowed on this endpoint",
    });
  }
}

function sanitizeParagraphs(data: string[]) {
  // remove all the line breaks
  data = data.map((paragraph) => paragraph.replace(/(\r\n|\n|\r)/gm, " "));
  // remove all the extra spaces
  data = data.map((paragraph) => paragraph.replace(/\s+/g, " "));
  // remove all the empty paragraphs
  data = data.filter((paragraph) => paragraph !== "" && paragraph !== " ");
  // return the data
  return data;
}

async function getProbabilityArray(data: string[]) {
  let results: number[] = [];
  // do it for each paragraph
  for (const paragraph of data) {
    // check for the ai-text

    // add timeout to the fetch
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
