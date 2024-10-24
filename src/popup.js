const SHARE_LINK =
  "https://chromewebstore.google.com/detail/modern-sis/eanhlljpacpbggaiijocfoapjbofdbfm";
const DEFAULT_MESSAGE = "Mohamed A. Abdallah | 2024";

function share() {
  const shareElement = document.getElementById("share");
  const messageElement = document.getElementById("message");
  const copiedElement = document.getElementById("copied");

  navigator.clipboard
    .writeText(SHARE_LINK)
    .then(() => {
      shareElement.classList.add("clicked");
      messageElement.style.display = "none";
      copiedElement.style.display = "block";

      setTimeout(() => {
        shareElement.classList.remove("clicked");
        messageElement.style.display = "block";
        copiedElement.style.display = "none";
      }, 1000);
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
      shareElement.classList.remove("clicked");
      copiedElement.style.display = "none";
      messageElement.style.display = "block";
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const copiedElement = document.getElementById("copied");
  copiedElement.textContent = chrome.i18n.getMessage("copied");

  const messageElement = document.getElementById("message");

  const handleMouseEvent = (event) => {
    const text =
      chrome.i18n.getMessage(event.currentTarget.dataset.alt) ||
      DEFAULT_MESSAGE;

    messageElement.classList.add("fade-out");

    setTimeout(() => {
      messageElement.textContent =
        event.type === "mouseover" ? text : DEFAULT_MESSAGE;

      messageElement.classList.remove("fade-out");
      messageElement.classList.add("fade-in");
    }, 100);

    if (event.type === "mouseout") {
      setTimeout(() => {
        messageElement.textContent = DEFAULT_MESSAGE;
        messageElement.classList.remove("fade-in");
        messageElement.classList.add("fade-out");
      }, 100);
    }
  };

  document.querySelectorAll("[data-alt]").forEach((element) => {
    element.addEventListener("mouseover", handleMouseEvent);
    element.addEventListener("mouseout", handleMouseEvent);
  });

  document.getElementById("share").addEventListener("click", share);

  chrome.storage.local.get("theme", (data) => {
    const theme = data.theme || "off";
    const themeRadio = document.querySelector(
      `input[name="theme"][value="${theme}"]`
    );
    if (themeRadio) {
      themeRadio.checked = true;
    }
  });

  document.querySelectorAll('input[name="theme"]').forEach((radio) => {
    radio.addEventListener("change", function () {
      const selectedTheme = this.value;

      // TODO: implement full path logic not just 128 pixels
      if (selectedTheme == "off") {
        chrome.action.setIcon({ path: `imgs/icons/128/off.png` });
      } else {
        chrome.action.setIcon({
          path: `imgs/icons/128/${selectedTheme.toLowerCase()}.png`,
        });
      }

      chrome.tabs.query({ url: "*://*.aou.edu.kw/*" }, (tabs) => {
        for (let i = 0; i < tabs.length; i++) {
          chrome.tabs.sendMessage(
            tabs[i].id,
            { action: "changeTheme", theme: selectedTheme },
            (response) => {
              if (chrome.runtime.lastError) {
                console.warn("Error: " + chrome.runtime.lastError.message);
              }
            }
          );
        }
      });
    });
  });
});
