console.log("content script running");

chrome.runtime.onMessage.addListener(gotCommand);

function gotCommand(request, sender, sendResponse) {
  if (request.command == "getTags") {
    const contents = getContents();
    sendResponse({ contents: contents });
  }
}

function getContents() {
  try {
    const tags = document.querySelectorAll("p");

    const contents = [];

    tags.forEach((tag) => {
      contents.push(tag.innerText);
    });
    return contents;
  } catch (error) {
    return null;
  }
}

async function getProbability(contents) {
  try {
    const validatorUrl = "https://huggingface.co/openai-detector?";

    const probability = [];

    await contents.forEach((content) => {
      fetch(validatorUrl + encodeURI(content), {
        method: "GET",
      }).then((res) =>
        res.json().then((data) => {
          probability.push(data.fake_probability);
        })
      );
    });
    return probability;
  } catch (error) {
    return null;
  }
}