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
    // sanitize all paragraphs for json-safe
    // remove all newlines
    // remove all tabs or double spaces
    for (let i = 0; i < paragraphs.length; i++) {
      paragraphs[i] = paragraphs[i].replace(/"/g, '\\"');
      paragraphs[i] = paragraphs[i].replace(/(\r\n|\n|\r)/gm, "");
      paragraphs[i] = paragraphs[i].replace(/\s\s+/g, " ");
    }

    // remove empty paragraphs
    for (let i = 0; i < paragraphs.length; i++) {
      if (paragraphs[i] == "") {
        paragraphs.splice(i, 1);
      }
    }
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
