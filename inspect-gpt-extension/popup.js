// popup.js

// Send message to content script to get paragraphs and chunks
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.tabs.sendMessage(
    tabs[0].id,
    { message: "get_paragraphs_and_chunks" },
    function (response) {
      let paragraphs = response.paragraphs;
      let chunks = response.collections;

      // Display loading screen
      document.getElementById("loading-screen").style.display = "block";

      // Make API requests for each paragraph and chunk
      let promises = [];
      for (let i = 0; i < paragraphs.length; i++) {
        promises.push(
          fetch(`http://localhost:3000/api/paragraph-scan`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: paragraphs[i].textContent }),
          })
        );
      }
      for (let i = 0; i < chunks.length; i++) {
        promises.push(
          fetch(`http://localhost:3000/api/paragraph-scan`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: chunks[i] }),
          })
        );
      }

      // Wait for all API requests to complete
      Promise.all(promises)
        .then((responses) => Promise.all(responses.map((r) => r.json())))
        .then((data) => {
          // Display paragraphs and chunks with their probabilities
          let results = document.getElementById("results");
          console.log(JSON.stringify(data));

          for (let i = 0; i < data.length; i++) {
            results.innerHTML += `<p>${data[i].text} - Probability: ${data[i].probability}</p>`;
          }

          // Hide loading screen
          document.getElementById("loading-screen").style.display = "none";
        })
        .catch((error) => {
          console.error("Error:", error);

          // Hide loading screen
          document.getElementById("loading-screen").style.display = "none";
        });
    }
  );
});
