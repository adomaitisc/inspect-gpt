console.log("InspectGPT - content.js script is able to run.");

let Paragraphs = [];
let Chunks = [];
let ResultsP = [];
let ResultsC = [];

const tags = document.querySelectorAll("p");

tags.forEach((pTag) => {
  Paragraphs.push(pTag.innerText);
});

Paragraphs = removeEmptyParagraphs(Paragraphs);

Chunks = paragraphsToChunks(Paragraphs);

console.log(Paragraphs);
console.log(Chunks);

chrome.runtime.onMessage.addListener(getData);

function getData(request, sender, sendResponse) {
  Paragraphs.forEach(async (paragraph) => {
    const textResultPair = await getResultForText(paragraph);
    ResultsP.push(textResultPair);
  });

  Chunks.forEach(async (paragraph) => {
    const textResultPair = await getResultForText(paragraph);
    ResultsC.push(textResultPair);
  });
}

function paragraphsToChunks(paragraphs) {
  const chunkSizeInWords = 70;

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
  const response = await fetch("https://inspectgpt.com/api/paragraph-scan/", {
    method: "POST",
    body: JSON.stringify({ text }),
  });
  const data = await response.json();
  const probability = data.fake_probability;

  return { text, probability };
}
