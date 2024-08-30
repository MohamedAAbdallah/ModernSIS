// Function to apply dark mode based on the saved preference
function applyDarkMode(isDarkMode) {
  if (isDarkMode) {
    document.body.id = "ModernSIS_dark";
  } else {
    document.body.id = "";
  }
}

// Load the user's choice from Chrome storage when the content script runs
chrome.storage.sync.get("darkMode", (data) => {
  const Mode = data.darkMode || false; // Default to false if not set
  applyDarkMode(Mode);
});

// Listen for messages from the popup to toggle dark mode
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleDarkMode") {
    const isDarkMode = request.mode;
    // Save the user's choice in Chrome storage
    chrome.storage.sync.set({ darkMode: isDarkMode }, () => {
      console.log("Dark mode preference saved:", isDarkMode);
    });
    // Apply or remove the "ModernSIS_dark" ID based on the mode
    applyDarkMode(isDarkMode);
  }
});
