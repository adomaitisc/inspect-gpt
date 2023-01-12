// content.js

// Collect all paragraphs in the page
let paragraphs = document.getElementsByTagName("p");
let collections = [];

// Make collections of 70 words each
for (let i = 0; i < paragraphs.length; i++) {
  let words = paragraphs[i].textContent.split(" ");
  let currentCollection = "";
  for (let j = 0; j < words.length; j++) {
    if ((currentCollection.split(" ").length + 1) % 70 === 0 && j !== 0) {
      collections.push(currentCollection);
      currentCollection = "";
    }
    currentCollection += words[j] + " ";
  }
  if (currentCollection.trim() !== "") {
    collections.push(currentCollection);
  }
}

// Listen for message from popup.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "get_paragraphs_and_chunks") {
    sendResponse({
      paragraphs: paragraphs,
      collections: collections,
    });
  }
});
