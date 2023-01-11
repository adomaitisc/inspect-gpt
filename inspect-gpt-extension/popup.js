// listen for a message from the content script
chrome.runtime.onMessage.addListener(gotResponse);

let Paragraphs = [];

// hide the results until we get a response from the content script
showLoader();

// get the current tab
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  // send a message to the content script
  chrome.tabs.sendMessage(
    tabs[0].id,
    { command: "getData" },
    function (response) {
      gotResponse(response);
    }
  );
});

async function gotResponse(response) {
  if (response == undefined || response == null) {
    showWarning();
    return;
  }

  Paragraphs = response.paragraphData;
  const Chunks = response.chunkData;

  await Paragraphs.forEach(async (paragraph) => {
    console.log("fetching");
    const textResultPair = await getResultForText(paragraph);
    ResultsP.push(textResultPair);
  });

  await Chunks.forEach(async (paragraph) => {
    console.log("fetching");
    const textResultPair = await getResultForText(paragraph);
    ResultsC.push(textResultPair);
  });

  const data = {
    scan: {
      amount: Paragraphs.length,
      total: Paragraphs.length + Chunks.length,
      highest: 0,
      average: 0,
    },
  };
}

async function getResultForText(text) {
  const res = await fetch("http://localhost:3000/api/paragraph-scan/", {
    method: "POST",
    body: JSON.stringify({ text: text }),
  }).then((response) =>
    response.json().then((data) => {
      const probability = data.fake_probability;
      return { text, probability };
    })
  );
  return res;
}

function render(data) {
  showResults();

  const GPTParagraphs = document.getElementById("gpt-paragraphs");
  const totalParagraphs = document.getElementById("total-paragraphs");
  const maxProbability = document.getElementById("max-probability");
  const averageProbability = document.getElementById("average-probability");

  GPTParagraphs.innerText = data.scan.amount + " GPT paragraphs";
  totalParagraphs.innerText = data.scan.total + " total paragraphs";
  maxProbability.innerText =
    Math.ceil(data.scan.highest * 100) + "% max probability";
  averageProbability.innerText =
    Math.ceil(data.scan.average * 100) + "% GPT probability";

  displayFirstParagraph();
}

function displayFirstParagraph() {
  const paragraph = document.getElementById("paragraph");
  const probability = document.getElementById("paragraph-probability");

  paragraph.innerText = Paragraphs[0][0];
  paragraph.setAttribute("current", 0);
  probability.innerText =
    Math.ceil(Paragraphs[0][1] * 100) + "% GPT probability";

  document.getElementById("previous-paragraph").disabled = true;
  document.getElementById("previous-icon").style.opacity = 0.5;

  if (Paragraphs.length == 1) {
    document.getElementById("next-paragraph").disabled = true;
    document.getElementById("next-icon").style.opacity = 0.5;
  }

  document
    .getElementById("previous-paragraph")
    .addEventListener("click", displayPreviousParagraph);
  document
    .getElementById("next-paragraph")
    .addEventListener("click", displayNextParagraph);
}

function displayNextParagraph() {
  const index =
    parseInt(document.getElementById("paragraph").getAttribute("current")) + 1;

  if (document.getElementById("previous-paragraph").disabled == true) {
    document.getElementById("previous-paragraph").disabled = false;
    document.getElementById("previous-icon").style.opacity = 1;
  }
  if (index > Paragraphs.length - 1) {
    return;
  }
  if (index == Paragraphs.length - 1) {
    document.getElementById("next-paragraph").disabled = true;
    document.getElementById("next-icon").style.opacity = 0.5;
  }

  const paragraph = document.getElementById("paragraph");
  const probability = document.getElementById("paragraph-probability");

  paragraph.innerText = Paragraphs[index][0];
  paragraph.setAttribute("current", index);
  probability.innerText =
    Math.ceil(Paragraphs[index][1] * 100) + "% GPT probability";
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

  paragraph.innerText = Paragraphs[index][0];
  paragraph.setAttribute("current", index);
  probability.innerText =
    Math.ceil(Paragraphs[index][1] * 100) + "% GPT probability";
}

function showLoader() {
  document.querySelectorAll("#results").forEach((el) => {
    el.style.display = "none";
  });
  document.getElementById("warning").style.display = "none";
  document.getElementById("loading").style.display = "block";
}

function showResults() {
  document.querySelectorAll("#results").forEach((el) => {
    el.style.display = "block";
  });
  document.getElementById("loading").style.display = "none";
}

function showWarning() {
  document.getElementById("warning").style.display = "block";
  document.getElementById("loading").style.display = "none";
}
