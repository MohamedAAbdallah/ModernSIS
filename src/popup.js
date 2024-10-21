const SHARE_LINK =
  "https://chromewebstore.google.com/detail/modern-sis/eanhlljpacpbggaiijocfoapjbofdbfm";
const DEFAULT_MESSAGE = "Mohamed A. Abdallah | 2024";

// function share() {
//   navigator.clipboard
//     .writeText(SHARE_LINK)
//     .then(() => {
//       // Optional: Provide user feedback, e.g., alert or change messageElement text
//       console.log("Link copied to clipboard!");
//     })
//     .catch((err) => {
//       console.error("Failed to copy: ", err);
//     });
// }

document.addEventListener("DOMContentLoaded", () => {
  const messageElement = document.getElementById("message");

  const handleMouseEvent = (event) => {
    const text =
      chrome.i18n.getMessage(event.currentTarget.dataset.alt) ||
      DEFAULT_MESSAGE;
    messageElement.textContent =
      event.type === "mouseover" ? text : DEFAULT_MESSAGE;
    messageElement.style.fontWeight =
      event.type === "mouseover" ? "bold" : "normal";
  };

  document.querySelectorAll("[data-alt]").forEach((element) => {
    element.addEventListener("mouseover", handleMouseEvent);
    element.addEventListener("mouseout", handleMouseEvent);
  });

  chrome.storage.local.get("theme", (data) => {
    const theme = data.theme || "None";
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

      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
          chrome.tabs.sendMessage(
            tabs[0].id,
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
