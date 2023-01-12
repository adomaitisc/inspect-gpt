// content.js

// Collect all paragraphs in the page
let paragraphs = document.getElementsByTagName("p");
let chunks = [];

// Make chunks of 70 words each
for (let i = 0; i < paragraphs.length; i++) {
  let words = paragraphs[i].textContent.split(" ");
  let currentChunk = "";
  for (let j = 0; j < words.length; j++) {
    if ((currentChunk.split(" ").length + 1) % 70 === 0 && j !== 0) {
      chunks.push(currentChunk);
      currentChunk = "";
    }
    currentChunk += words[j] + " ";
  }
  if (currentChunk.trim() !== "") {
    chunks.push(currentChunk);
  }
}

// Listen for message from popup.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "get_paragraphs_and_chunks") {
    sendResponse({
      paragraphs: paragraphs,
      chunks: chunks,
    });
  }
});
