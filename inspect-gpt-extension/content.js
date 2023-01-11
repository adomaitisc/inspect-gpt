console.log("InspectGPT - content.js script is able to run.");

let Paragraphs = [];
let Chunks = [];
let ResultsP = [];
let ResultsC = [];

const chunkSizeInWords = 70;

init();

function init() {
  const tags = document.querySelectorAll("p");

  tags.forEach((pTag) => {
    Paragraphs.push(pTag.innerText);
  });

  Paragraphs = removeEmptyParagraphs(Paragraphs);

  Chunks = paragraphsToChunks(Paragraphs);

  chrome.runtime.onMessage.addListener(getData);
}

function getData(sendResponse) {
  sendResponse({ paragraphData: ResultsP, chunkData: ResultsC });
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
