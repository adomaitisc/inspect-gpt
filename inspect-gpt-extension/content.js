console.log("InspectGPT - content.js script is able to run.");

let Paragraphs = [];
let Chunks = [];
let ResultsP = [];
let ResultsC = [];

const chunkSizeInWords = 70;

await init();

async function init() {
  const tags = document.querySelectorAll("p");

  tags.forEach((pTag) => {
    Paragraphs.push(pTag.innerText);
  });

  Paragraphs = removeEmptyParagraphs(Paragraphs);

  Chunks = paragraphsToChunks(Paragraphs);

  console.log(Paragraphs);
  console.log(Chunks);

  await Paragraphs.forEach(async (paragraph) => {
    console.log("fetching");
    const textResultPair = await getResultForText(paragraph);
    ResultsP.push(textResultPair);
  });

  await Chunks.forEach(async (paragraph) => {
    console.log("fetching");
    const textResultPair = await getResultForText(paragraph);
    ResultsC.push(textResultPair);
  });

  chrome.runtime.onMessage.addListener(getData);
}

async function getData(request, sender, sendResponse) {
  console.log(ResultsP);
  console.log(ResultsC);
  await sendResponse({ paragraphData: ResultsP, chunkData: ResultsC });
}

function paragraphsToChunks(paragraphs) {
  const chunks = [];
  const words = [];

  paragraphs.forEach((paragraph) => {
    const paragraphWords = paragraph.split(" ");
    words.push(...paragraphWords);
  });

  // create chunks of 70 words
  while (words.length > 0) {
    if (words.length < chunkSizeInWords) {
      const chunk = words.join(" ");
      chunks.push(chunk);
      break;
    }
    const chunk = words.splice(0, chunkSizeInWords).join(" ");
    chunks.push(chunk);
  }

  return chunks;
}

function removeEmptyParagraphs(paragraphs) {
  return paragraphs.filter((paragraph) => paragraph !== "");
}

async function getResultForText(text) {
  const res = await fetch("http://localhost:3000/api/paragraph-scan/", {
    method: "POST",
    body: JSON.stringify({ text: text }),
  }).then((response) =>
    response.json().then((data) => {
      const probability = data.fake_probability;
      return { text, probability };
    })
  );
  return res;
}
