// listen for a message from the content script
chrome.runtime.onMessage.addListener(gotResponse);

let ParagraphResultPair = [];
let ChunkResultPair = [];

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.tabs.sendMessage(
    tabs[0].id,
    { command: "getData" },
    function (response) {
      gotResponse(response);
    }
  );
});

function gotResponse(response) {
  if (response == undefined || response == null) {
    render(JSON.stringify(response));
    return;
  }

  render(JSON.stringify(response));
}

function render(text) {
  document.getElementById("testing").innerHTML = text;
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
