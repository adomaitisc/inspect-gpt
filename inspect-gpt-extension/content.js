console.log("InspectGPT - content.js script is able to run.");

chrome.runtime.onMessage.addListener(fetchData);

function fetchData(request, sender, sendResponse) {
  if (request.command == "get-paragraphs") {
    const tags = document.querySelectorAll("p");

    const Paragraphs = [];
    const Chunks = [];
    const ResultsP = [];
    const ResultsC = [];

    tags.forEach((pTag) => {
      Paragraphs.push(pTag.innerText);
    });

    Paragraphs = removeEmptyParagraphs(Paragraphs);

    Paragraphs.forEach(async (paragraph) => {
      const textResultPair = await getResultForText(paragraph);
      ResultsP.push(textResultPair);
    });

    Chunks = paragraphsToChunks(Paragraphs);

    Chunks.forEach(async (paragraph) => {
      const textResultPair = await getResultForText(paragraph);
      ResultsC.push(textResultPair);
    });
  }
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
