chrome.storage.local.get("theme", (data) => {
  const theme = data.theme || "None";
  document.querySelector(
    `input[name="theme"][value="${theme}"]`
  ).checked = true;
});

document.querySelectorAll('input[name="theme"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    const selectedTheme = this.value;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: "changeTheme", theme: selectedTheme },
          (response) => {
            if (chrome.runtime.lastError) {
              console.warn("Whoops.. " + chrome.runtime.lastError.message);
            }
          }
        );
      }
    });
  });
});
