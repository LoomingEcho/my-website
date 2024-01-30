import { addClass, removeClass, waitFor } from "@kluntje/js-utils/lib/dom-helpers";
import { ACTIVE } from "Constants/cssClasses";

const showSuccessMessage = async (message: string) => {
  const successBox = document.createElement("div");
  addClass(successBox, "vic-lsg-success-box");
  const successMessage = document.createElement("div");
  addClass(successMessage, "vic-lsg-success-box__message");
  successMessage.innerText = message;
  successBox.appendChild(successMessage);
  document.body.appendChild(successBox);
  await waitFor(1);
  addClass(successBox, ACTIVE);
  await waitFor(1000);
  removeClass(successBox, ACTIVE);
  await waitFor(300);
  document.body.removeChild(successBox);
};

const copyToClipboard = (message: string, itemName = "") => {
  const tmpTextarea = document.createElement("textarea");
  tmpTextarea.value = message;
  tmpTextarea.setAttribute("readonly", "");
  tmpTextarea.style.position = "absolute";
  tmpTextarea.style.left = "-9999px";
  document.body.appendChild(tmpTextarea);
  tmpTextarea.select();
  document.execCommand("copy");
  document.body.removeChild(tmpTextarea);
  showSuccessMessage(`Copied ${itemName !== "" ? `${itemName} ` : ""}to Clipboard`);
};

window.copyToClipboard = copyToClipboard;
