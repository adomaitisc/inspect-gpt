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
    const data = sanitizeParagraphs(req.body.paragraphs);

    // use the data onto the hugginface GPT-output detector to check for ai-text
    const results = await detectAiText(data);

    // get average probability
    // const sum = results.reduce((a, b) => a + b, 0);
    // const average = sum / results.length;

    // the average is not very accurate, so we use the average of the tokenized sentences instead
    const average = await getGPTAverage(data);

    // get highest probability
    const highest = Math.max(...results);

    // get amount of paragraphs that have >50% fake probability
    const amount = results.filter((result) => result > 0.5).length;

    // get amount of paragraphs
    const total = results.length;

    res.status(200).json({
      results: results,
      scan: { average, highest, amount, total },
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

async function detectAiText(data: string[]) {
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

async function getGPTAverage(data: string[]) {
  let results: number[] = [];

  // unify all the data into one string
  const unifiedData = data.join(" ");

  // roughly tokenize the data by splitting it into sentences of 60 words
  const sentences: string[] = [];
  const words = unifiedData.split(" ");
  for (let i = 0; i < words.length; i += 100) {
    sentences.push(words.slice(i, i + 100).join(" "));
  }

  console.log("sentences", sentences);
  console.log("sentences", sentences.length);
  console.log("words", words);
  console.log("words", words.length);

  // fetch for each sentence
  for (const sentence of sentences) {
    const res = await fetch(
      `https://huggingface.co/openai-detector?${encodeURI(sentence)}`,
      {
        method: "GET",
      }
    );
    const data = await res.json();
    results.push(parseFloat(data.fake_probability));
  }

  console.log("results", results);

  // get the average of the results
  const average = results.reduce((a, b) => a + b, 0) / results.length;
  console.log("average", average);

  // return the average
  return average;
}

// Another posssible detector

// async function detectAiText(data: string[]) {
//   let results: number[] = [];
//   // do it for each paragraph
//   for (const paragraph of data) {
//     let body = new URLSearchParams();
//     body.append("action", "ai_content_detector");
//     body.append("inputs", paragraph);
//     // check for the ai-text
//     const res = await fetch("https://writer.com/wp-admin/admin-ajax.php", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: body,
//     });
//     const data = await res.json();
//     results.push(1 - parseFloat(data[0].score));
//   }
//   // return the result
//   return results;
// }
