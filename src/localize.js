function localizeElementById(elementId, messageKey) {
  const element = document.getElementById(elementId);
  if (element) {
    const message = chrome.i18n.getMessage(messageKey);
    if (message) {
      element.innerText = message;
    } else {
      console.warn(`Message key "${messageKey}" not found.`);
    }
  } else {
    console.warn(`Element with ID "${elementId}" not found.`);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const elementsToLocalize = [
    { id: "selectTheme", messageKey: "selectTheme" },
  ];

  elementsToLocalize.forEach(({ id, messageKey }) => {
    localizeElementById(id, messageKey);
  });
});
