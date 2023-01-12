// popup.js

// Send message to content script to get paragraphs and collections
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.tabs.sendMessage(
    tabs[0].id,
    { message: "get_paragraphs_and_collections" },
    function (response) {
      let paragraphs = response.paragraphs;
      let collections = response.collections;

      // Make API requests for each paragraph and collection
      let paragraphPromises = [];
      let collectionPromises = [];

      for (let i = 0; i < paragraphs.length; i++) {
        paragraphPromises.push(
          fetch(`https://inspectgpt.com/api/paragraph-scan`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: paragraphs[i] }),
          })
        );
      }
      for (let i = 0; i < collections.length; i++) {
        collectionPromises.push(
          fetch(`https://inspectgpt.com/api/paragraph-scan`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: collections[i] }),
          })
        );
      }

      // Wait for all API requests to complete
      Promise.all(paragraphPromises)
        .then((responses) => Promise.all(responses.map((r) => r.json())))
        .then((data) => {
          // Get the average probability by using the collections
          Promise.all(collectionPromises).then((responses) => {
            Promise.all(responses.map((r) => r.json())).then(
              (collectionData) => {
                // calculate the average probability
                let averageProbability = 0;
                for (let i = 0; i < collectionData.length; i++) {
                  averageProbability += collectionData[i].probability;
                }
                averageProbability /= collectionData.length;

                // Find paragraphs with > 0.5 probability
                let highProbabilityParagraphs = data.filter(
                  (p) => p.probability > 0.5
                );

                // Find paragraphs with highest probability
                let highestProbabilityParagraph = 0;
                for (let i = 0; i < data.length; i++) {
                  if (data[i].probability > highestProbabilityParagraph) {
                    highestProbabilityParagraph = data[i].probability;
                  }
                }

                // Display all the page-scan probability
                let pageResults = document.getElementById("page-scan");
                pageResults.innerHTML += `<p class="scan-bubble">${highProbabilityParagraphs.length} GPT paragraphs</p>`;
                pageResults.innerHTML += `<p class="scan-bubble">${data.length} total paragraphs</p>`;
                pageResults.innerHTML += `<p class="scan-bubble">${Math.ceil(
                  highestProbabilityParagraph * 100
                )}% max probability</p>`;
                pageResults.innerHTML += `<div class="scan-bubble">${Math.ceil(
                  averageProbability * 100
                )}% GPT probability</div>`;

                // Hide loading screen
                document.getElementById("page-load").style.display = "none";
              }
            );
          });

          // Display paragraphs with their probabilities
          let results = document.getElementById("paragraph-scan");

          for (let i = 0; i < data.length; i++) {
            results.innerHTML += `<p class="scan-paragraph">${data[i].text}</p>`;
            results.innerHTML += `<p class="scan-bubble-focus">${Math.ceil(
              data[i].probability * 100
            )}% GPT probability</p>`;
            results.innerHTML += `<div class="scan-separator"></div>`;
          }

          // Hide loading screen
          document.getElementById("paragraph-load").style.display = "none";
        })
        .catch((error) => {
          // Hide loading screen
          document.getElementById("page-load").style.display = "none";
          document.getElementById("paragraph-load").style.display = "none";

          // Hide scan elements
          document.getElementById("page-scan").style.display = "none";
          document.getElementById("paragraph-scan").style.display = "none";

          // Display error message
          const errorContainer = document.getElementById("results");
          errorContainer.style.display = "flex";
          errorContainer.style.flexDirection = "column";
          errorContainer.style.justifyContent = "center";
          errorContainer.style.alignItems = "center";

          errorContainer.innerHTML += `<p class="error-message">Something went wrong. Try again later.</p>`; // If the error persists, contact our support team.
          errorContainer.innerHTML += `<a class="error-link" href="https://inspectgpt.com/support" target="_blank" rel="noreferrer">Support Page</a>`;
        });
    }
  );
});
