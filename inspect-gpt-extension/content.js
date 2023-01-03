console.log("content script running");

chrome.runtime.onMessage.addListener(gotCommand);

function gotCommand(request, sender, sendResponse) {
  if (request.command == "get-paragraphs") {
    const tags = document.querySelectorAll("p");

    const paragraphs = [];

    tags.forEach((tag) => {
      // remove empty paragraphs
      if (tag.innerText === "") return;
      paragraphs.push(tag.innerText);
    });
    console.log(paragraphs);
    sendResponse({ content: paragraphs });
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
