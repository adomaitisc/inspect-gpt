let PARAGRAPHS = [];
let PROBABILITIES = [];
let SCAN = null;

// hide the results until we get a response from the content script
hideResults();

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
  const content = response.content;
  PARAGRAPHS = content;

  // sanitize all paragraphs for json-safe
  for (let i = 0; i < content.length; i++) {
    content[i] = content[i].replace(/"/g, '\\"');
  }

  // remove line breaks and double spaces
  content = content.map((p) => p.replace(/(\r\n|\n|\r)/gm, " "));

  fetch("https://inspectgpt.com/api/scan", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ paragraphs: content }),
  }).then((res) =>
    res.json().then((data) => {
      PROBABILITIES = data.results;
      // add the scan to the data
      showResults();
      render(data);
    })
  );
}

function render(data) {
  // grab all the elements
  const GPTParagraphs = document.getElementById("gpt-paragraphs");
  const totalParagraphs = document.getElementById("total-paragraphs");
  const maxProbability = document.getElementById("max-probability");
  const averageProbability = document.getElementById("average-probability");

  // set the text
  GPTParagraphs.innerText = data.scan.amount + " GPT paragraphs";
  totalParagraphs.innerText = data.scan.total + " total paragraphs";
  maxProbability.innerText =
    Math.ceil(data.scan.highest * 100) + "% max probability";
  averageProbability.innerText =
    Math.ceil(data.scan.average * 100) + "% GPT probability";

  // display the first paragraph
  displayFirstParagraph();
}

function displayFirstParagraph() {
  // get the paragraph
  const paragraph = document.getElementById("paragraph");
  const probability = document.getElementById("paragraph-probability");

  // set the text
  paragraph.innerText = PARAGRAPHS[0];

  // set the current attribute
  paragraph.setAttribute("current", 0);
  probability.innerText =
    Math.ceil(PROBABILITIES[0] * 100) + "% GPT probability";

  // disable the previous button
  document.getElementById("previous-paragraph").disabled = true;
  document.getElementById("previous-icon").style.opacity = 0.5;

  // if there is only one paragraph, disable the next button
  if (PARAGRAPHS.length == 1) {
    document.getElementById("next-paragraph").disabled = true;
    document.getElementById("next-icon").style.opacity = 0.5;
  }
}

function displayNextParagraph() {
  const index =
    parseInt(document.getElementById("paragraph").getAttribute("current")) + 1;

  if (document.getElementById("previous-paragraph").disabled == true) {
    document.getElementById("previous-paragraph").disabled = false;
    document.getElementById("previous-icon").style.opacity = 1;
  }
  if (index > PARAGRAPHS.length - 1) {
    return;
  }
  if (index == PARAGRAPHS.length - 1) {
    document.getElementById("next-paragraph").disabled = true;
    document.getElementById("next-icon").style.opacity = 0.5;
  }

  const paragraph = document.getElementById("paragraph");
  const probability = document.getElementById("paragraph-probability");

  paragraph.innerText = PARAGRAPHS[index];
  paragraph.setAttribute("current", index);
  probability.innerText =
    Math.ceil(PROBABILITIES[index] * 100) + "% GPT probability";
}

function displayPreviousParagraph() {
  const index =
    parseInt(document.getElementById("paragraph").getAttribute("current")) - 1;

  if (document.getElementById("next-paragraph").disabled == true) {
    document.getElementById("next-paragraph").disabled = false;
    document.getElementById("next-icon").style.opacity = 1;
  }
  if (index < 0) {
    return;
  }
  if (index == 0) {
    document.getElementById("previous-paragraph").disabled = true;
    document.getElementById("previous-icon").style.opacity = 0.5;
  }

  const paragraph = document.getElementById("paragraph");
  const probability = document.getElementById("paragraph-probability");

  paragraph.innerText = PARAGRAPHS[index];
  paragraph.setAttribute("current", index);
  probability.innerText =
    Math.ceil(PROBABILITIES[index] * 100) + "% GPT probability";
}

function hideResults() {
  document.querySelectorAll("#results").forEach((el) => {
    el.style.display = "none";
  });
  document.getElementById("loading").style.display = "block";
}

function showResults() {
  document.querySelectorAll("#results").forEach((el) => {
    el.style.display = "block";
  });
  document.getElementById("loading").style.display = "none";
}
