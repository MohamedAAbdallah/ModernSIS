function share() {
  const link =
    "https://chromewebstore.google.com/detail/modern-sis/eanhlljpacpbggaiijocfoapjbofdbfm";
  navigator.clipboard.writeText(link);
}

// document.getElementById("Share").addEventListener("click", share);

document.addEventListener("DOMContentLoaded", function () {
  const messageElement = document.getElementById("message");

  function handleMouseEvent(event) {
    const text = chrome.i18n.getMessage(event.currentTarget.dataset.alt);
    switch (event.type) {
      case "mouseover":
        messageElement.textContent = text;
        messageElement.style.fontWeight = "bold";
        break;
      case "mouseout":
        messageElement.textContent = "Mohamed A. Abdallah | 2024";
        messageElement.style.fontWeight = "normal";
        break;
    }
  }

  document.querySelectorAll("label, a").forEach((element) => {
    element.addEventListener("mouseover", handleMouseEvent);
    element.addEventListener("mouseout", handleMouseEvent);
  });
});

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
