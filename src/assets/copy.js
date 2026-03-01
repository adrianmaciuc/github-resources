const getCodeText = (scope) => {
  const code = scope.querySelector("pre code");
  return code ? code.textContent : "";
};

const copyText = async (text) => {
  if (navigator?.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  const ok = document.execCommand("copy");
  document.body.removeChild(textarea);
  return ok;
};

const setButtonState = (button, state) => {
  if (state === "copied") {
    button.textContent = "Copied";
    button.setAttribute("aria-live", "polite");
  } else {
    button.textContent = "Copy";
    button.removeAttribute("aria-live");
  }
};

document.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-copy-button]");
  if (!button) return;

  const scope = button.closest("[data-copy-scope]");
  if (!scope) return;

  const text = getCodeText(scope);
  if (!text) return;

  const ok = await copyText(text);
  if (!ok) return;

  setButtonState(button, "copied");
  setTimeout(() => setButtonState(button, "idle"), 1500);
});
