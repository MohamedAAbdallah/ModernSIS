function applyTheme(theme) {
  if (theme === "None") {
    document.body.id = "";
    document.body.className = "";
  } else {
    document.body.id = `${theme}`;
    document.body.className = `ModernSIS`;
  }
}

chrome.storage.local.get("theme", (data) => {
  const theme = data.theme || "None";
  applyTheme(theme);
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "changeTheme") {
    const theme = request.theme;
    chrome.storage.local.set({ theme: theme }, () => {
      applyTheme(theme);
    });
  }
});
