function applyTheme(theme) {
  if (theme === "None") {
    document.body.id = "";
    document.body.className = "";

    document.getElementById("HeaderReg_imgBanner").src = "images/header-5.jpg";
  } else {
    document.body.id = `${theme}`;
    document.body.className = `ModernSIS`;

    const id = chrome.i18n.getMessage("@@extension_id");
    const path = `chrome-extension://${id}/imgs/banners/${theme}.jpg`;
    document.getElementById("HeaderReg_imgBanner").src = path;
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

document.getElementById("Share").addEventListener("click", async () => {
  const link =
    "https://chromewebstore.google.com/detail/modern-sis/eanhlljpacpbggaiijocfoapjbofdbfm?";
  try {
    await navigator.clipboard.writeText(link);
    alert("Link copied to clipboard: " + link);
  } catch (err) {
    console.error("Failed to copy the link: ", err);
  }
});
