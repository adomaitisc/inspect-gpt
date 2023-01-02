// listen for a message from the content script
chrome.runtime.onMessage.addListener(gotResponse);

let PARAGRAPHS = [];
let PROBABILITIES = [];

// get the current tab
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  // send a message to the content script
  chrome.tabs.sendMessage(
    tabs[0].id,
    { command: "get-paragraphs" },
    function (response) {
      gotResponse(response);
    }
  );
});

function gotResponse(response) {
  const content = response.content;

  fetch("https://inspectgpt.com/api/scan", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ paragraphs: content }),
  }).then((res) =>
    res.json().then((data) => {
      SCAN = data.scan;
      PROBABILITIES = data.results;
      render(data);
    })
  );
}

function render(data) {
  const el = document.createElement("div");
  el.innerHTML = JSON.stringify(data);
  document.body.appendChild(el);
}
