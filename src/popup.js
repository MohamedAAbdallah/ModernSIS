const SHARE_LINK =
  "https://chromewebstore.google.com/detail/modern-sis/eanhlljpacpbggaiijocfoapjbofdbfm";
const DEFAULT_MESSAGE = "Mohamed A. Abdallah";

document.addEventListener("DOMContentLoaded", () => {
  const shareElement = document.getElementById("share");
  const footerElement = document.getElementById("footer");
  const copiedElement = document.getElementById("copied");
  const messageElement = document.getElementById("message");
  let hoverTimeout;

  copiedElement.textContent = chrome.i18n.getMessage("copied");

  function share() {
    navigator.clipboard.writeText(SHARE_LINK).finally(() => {
      shareElement.classList.add("clicked");
      footerElement.classList.add("copied");

      setTimeout(() => {
        shareElement.classList.remove("clicked");
        footerElement.classList.remove("copied");
      }, 500);
    });
  }

  function handleMouseEvent(event) {
    const text =
      chrome.i18n.getMessage(event.currentTarget.dataset.alt) ||
      DEFAULT_MESSAGE;

    if (event.type === "mouseover") {
      clearTimeout(hoverTimeout);
      messageElement.classList.add("fade-out");
      setTimeout(() => {
        messageElement.textContent = text;
        messageElement.classList.remove("fade-out");
        messageElement.classList.add("fade-in");
      }, 100);
    } else if (event.type === "mouseout") {
      hoverTimeout = setTimeout(() => {
        const hovered = document.querySelector(":hover");
        if (!hovered || !hovered.closest("[data-alt]")) {
          messageElement.textContent = DEFAULT_MESSAGE;
          messageElement.classList.remove("fade-in");
          messageElement.classList.add("fade-out");
        }
      }, 500);
    }
  }

  document.querySelectorAll("[data-alt]").forEach((element) => {
    element.addEventListener("mouseover", handleMouseEvent);
    element.addEventListener("mouseout", handleMouseEvent);
  });

  shareElement.addEventListener("click", share);

  chrome.storage.local.get("theme", (data) => {
    const theme = data.theme || "off";
    const themeRadio = document.querySelector(
      `input[name="theme"][value="${theme}"]`
    );
    if (themeRadio) themeRadio.checked = true;
  });

  document.querySelectorAll('input[name="theme"]').forEach((radio) => {
    radio.addEventListener("change", function () {
      const selectedTheme = this.value;
      const iconBase = `imgs/icons`;
      const selectedIcons = {
        16: `${iconBase}/16/${selectedTheme}.png`,
        32: `${iconBase}/32/${selectedTheme}.png`,
        48: `${iconBase}/48/${selectedTheme}.png`,
        128: `${iconBase}/128/${selectedTheme}.png`,
      };

      chrome.action.setIcon({ path: selectedIcons });
      chrome.storage.local.set({ theme: selectedTheme });
    });
  });
});
