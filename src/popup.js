// Load the saved mode and update the checkbox
chrome.storage.sync.get("darkMode", (data) => {
  const isDarkMode = data.darkMode || false; // Default to false if not set
  document.getElementById("dark-mode-toggle").checked = isDarkMode;
});

// Listen for changes on the checkbox and send a message to the content script
document
  .getElementById("dark-mode-toggle")
  .addEventListener("change", function () {
    const isDarkMode = this.checked;

    // Send a message to the content script to toggle dark mode
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "toggleDarkMode",
        mode: isDarkMode,
      });
    });
  });
