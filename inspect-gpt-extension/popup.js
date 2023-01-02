// listen for a message from the content script
chrome.runtime.onMessage.addListener(gotResponse);

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
  const contents = response.contents;
  alert(contents);
}
