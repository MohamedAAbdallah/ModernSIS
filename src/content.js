function applyTheme(theme) {
  const id = chrome.i18n.getMessage("@@extension_id");
  const imgBanner = document.getElementById("HeaderReg_imgBanner");

  if (theme === "off") {
    document.body.id = "";
    document.body.className = "";
    imgBanner.src = "images/header-5.jpg";
  } else {
    document.body.id = theme;
    document.body.className = "ModernSIS";
    imgBanner.src = `chrome-extension://${id}/imgs/banners/${theme}.jpg`;
  }
}

chrome.storage.local.get("theme", (data) => {
  applyTheme(data.theme || "off");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "changeTheme") {
    const newTheme = request.theme;
    chrome.storage.local.set({ theme: newTheme }, () => {
      applyTheme(newTheme);
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get("theme", (data) => {
    applyTheme(data.theme || "off");
  });
});
