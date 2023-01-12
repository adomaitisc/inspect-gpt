// popup.js

// Send message to content script to get paragraphs and collections
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.tabs.sendMessage(
    tabs[0].id,
    { message: "get_paragraphs_and_chunks" },
    function (response) {
      // Get paragraphs and collections from response
      let paragraphs = response.paragraphs;
      let collections = response.collections;

      // Display loading screen
      document.getElementById("loading-screen").style.display = "block";

      // Make API requests for each paragraph and collection
      let paragraphPromises = [];
      let collectionPromises = [];

      // Appending to paragraphPromises[]
      for (let i = 0; i < paragraphs.length; i++) {
        paragraphPromises.push(
          fetch(`http://localhost:3000/api/paragraph-scan`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: paragraphs[i].textContent }),
          })
        );
      }

      // Appending to collectionPromises[]
      for (let i = 0; i < collections.length; i++) {
        collectionPromises.push(
          fetch(`http://localhost:3000/api/paragraph-scan`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: collections[i] }),
          })
        );
      }

      // Execute and wait for all the requests to return
      Promise.all(paragraphPromises)
        .then((responses) => Promise.all(responses.map((r) => r.json())))
        .then((data) => handleParagraphData(data))
        .catch((error) => handleError(error));
    }
  );
});

function handleParagraphData(data) {
  // Display paragraphs with their probabilities
  let results = document.getElementById("results");
  for (let i = 0; i < data.length; i++) {
    results.innerHTML += `<p>${data[i].text} - Probability: ${data[i].probability}</p>`;
  }
  // Hide loading screen
  document.getElementById("loading-screen").style.display = "none";
}

function handleError(error) {
  // Show error message
  document.getElementById("errors").style.display = "block";
  document.getElementById("errors").innerHTML = error;
  // Hide loading screen
  document.getElementById("loading-screen").style.display = "none";
}
