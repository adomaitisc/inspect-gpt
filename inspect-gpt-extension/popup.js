// listen for a message from the content script
chrome.runtime.onMessage.addListener(gotResponse);

let ParagraphResultPair = [];
let ChunkResultPair = [];

init();

function init() {
  // hide the results until we get a response from the content script
  showPopupLoader();

  // send a message to the content script
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { command: "getData" },
      function (response) {
        gotResponse(response);
      }
    );
  });
}

function gotResponse(response) {
  if (response == undefined || response == null) {
    showPopupWarning();
    return;
  }

  const paragraphs = response.paragraphData;
  const chunks = response.chunkData;

  paragraphs
    .forEach((paragraph) => {
      ParagraphResultPair.push(
        fetch("http://localhost:3000/api/paragraph-scan/", {
          method: "POST",
          body: JSON.stringify({ text: paragraph }),
        }).then((response) =>
          response.json().then((data) => {
            const probability = data.fake_probability;
            return { paragraph, probability };
          })
        )
      );
    })
    .then(() => {
      chunks.forEach(async (paragraph) => {
        ChunkResultPair.push(
          fetch("http://localhost:3000/api/paragraph-scan/", {
            method: "POST",
            body: JSON.stringify({ text: paragraph }),
          }).then((response) =>
            response.json().then((data) => {
              const probability = data.fake_probability;
              return { paragraph, probability };
            })
          )
        );
      });
    })
    .then(() => {
      const scanResults = {
        amount: ParagraphResultPair.length,
        total: getAmountAboveThreshold(ParagraphResultPair, 0.5),
        highest: getHighestProbability(ParagraphResultPair),
        average: getAverageProbability(ChunkResultPair),
      };
      render(scanResults);
    });
}

function getAmountAboveThreshold(array, threshold) {
  let amount = 0;
  array.forEach((element) => {
    if (element[1] > threshold) {
      amount++;
    }
  });
  return amount;
}

function getHighestProbability(array) {
  let highest = 0;
  array.forEach((element) => {
    if (element[1] > highest) {
      highest = element[1];
    }
  });
}

function getAverageProbability(array) {
  let sum = 0;
  array.forEach((element) => {
    sum += element[1];
  });
  return sum / array.length;
}

function render(data) {
  showPopupResults();

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

  paragraph.innerText = ParagraphResultPair[0][0];
  paragraph.setAttribute("current", 0);
  probability.innerText =
    Math.ceil(ParagraphResultPair[0][1] * 100) + "% GPT probability";

  document.getElementById("previous-paragraph").disabled = true;
  document.getElementById("previous-icon").style.opacity = 0.5;

  if (ParagraphResultPair.length == 1) {
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
  if (index > ParagraphResultPair.length - 1) {
    return;
  }
  if (index == ParagraphResultPair.length - 1) {
    document.getElementById("next-paragraph").disabled = true;
    document.getElementById("next-icon").style.opacity = 0.5;
  }

  const paragraph = document.getElementById("paragraph");
  const probability = document.getElementById("paragraph-probability");

  paragraph.innerText = ParagraphResultPair[index][0];
  paragraph.setAttribute("current", index);
  probability.innerText =
    Math.ceil(ParagraphResultPair[index][1] * 100) + "% GPT probability";
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

  paragraph.innerText = ParagraphResultPair[index][0];
  paragraph.setAttribute("current", index);
  probability.innerText =
    Math.ceil(ParagraphResultPair[index][1] * 100) + "% GPT probability";
}

function showPopupLoader() {
  document.querySelectorAll("#results").forEach((el) => {
    el.style.display = "none";
  });
  document.getElementById("warning").style.display = "none";
  document.getElementById("loading").style.display = "block";
}

function showPopupResults() {
  document.querySelectorAll("#results").forEach((el) => {
    el.style.display = "block";
  });
  document.getElementById("loading").style.display = "none";
}

function showPopupWarning() {
  document.getElementById("warning").style.display = "block";
  document.getElementById("loading").style.display = "none";
}
