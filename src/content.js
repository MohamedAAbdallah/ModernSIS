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
    const bannerPath = `chrome-extension://${id}/imgs/banners/${theme}.jpg`;
    const fallbackPath = `chrome-extension://${id}/imgs/banners/White.jpg`;

    const bannerExists = new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = bannerPath;
    });

    bannerExists.then((exists) => {
      imgBanner.src = exists ? bannerPath : fallbackPath;
    });
  }
}

chrome.storage.local.get("theme", (data) => {
  applyTheme(data.theme || "off");
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes.theme) {
    applyTheme(changes.theme.newValue);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get("theme", (data) => {
    applyTheme(data.theme || "off");
  });
});
