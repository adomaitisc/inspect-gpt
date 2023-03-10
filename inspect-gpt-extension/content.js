// content.js

// Collect all paragraphs in the page
let tags = document.getElementsByTagName("p");
let paragraphs = [];
let collections = [];

for (let i = 0; i < tags.length; i++) {
  if (tags[i].textContent.trim() !== "") {
    paragraphs.push(tags[i].textContent);
  }
}

// separate all paragraphs into words
let words = [];
paragraphs.map((p) => p.split(" ").forEach((w) => words.push(w)));

// separate words in collections
for (let i = 0; i < words.length; i += 100) {
  collections.push(words.slice(i, i + 100).join(" "));
}

console.log("InspectGPT - content script loaded");

// Listen for message from popup.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "get_paragraphs_and_collections") {
    console.log("InspectGPT - received message from popup script");
    sendResponse({
      paragraphs: paragraphs,
      collections: collections,
    });
  }
});
