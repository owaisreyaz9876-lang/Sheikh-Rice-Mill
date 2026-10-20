/*
  Sheikh Ricemill website configuration
  Replace the placeholder with the business WhatsApp number in international format:
  country code + number, digits only. India example: 919876543210 (do not include + or spaces).
*/
const BUSINESS_WHATSAPP_NUMBER = "916005055869";

const form = document.getElementById("enquiry-form");
const hint = document.getElementById("form-hint");
const phoneDisplay = document.getElementById("phone-display");
const floatingWhatsApp = document.getElementById("floating-whatsapp");

function hasRealNumber() {
  return /^\d{10,15}$/.test(BUSINESS_WHATSAPP_NUMBER) && !BUSINESS_WHATSAPP_NUMBER.includes("X");
}

if (hasRealNumber()) {
  phoneDisplay.textContent = "+" + BUSINESS_WHATSAPP_NUMBER;
  floatingWhatsApp.href = "https://wa.me/" + BUSINESS_WHATSAPP_NUMBER;
  floatingWhatsApp.target = "_blank";
  floatingWhatsApp.rel = "noopener noreferrer";
} else {
  phoneDisplay.textContent = "Business phone number to be added";
  floatingWhatsApp.href = "#contact";
  floatingWhatsApp.addEventListener("click", () => {
    hint.textContent = "Add the business WhatsApp number in script.js to activate direct WhatsApp contact.";
  });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const name = data.get("name").trim();
  const business = data.get("business").trim();
  const interest = data.get("interest");
  const message = data.get("message").trim();

  const text = [
    "Hello Sheikh Ricemill, I would like to make an enquiry.",
    "",
    "Name: " + name,
    business ? "Business: " + business : "",
    "Enquiry: " + interest,
    "Message: " + message
  ].filter(Boolean).join("\n");

  if (!hasRealNumber()) {
    hint.textContent = "The form is working, but the business WhatsApp number must be added in script.js before messages can be sent.";
    const oldPreview = document.getElementById("message-preview");
    if (oldPreview) oldPreview.remove();
    const preview = document.createElement("pre");
    preview.id = "message-preview";
    preview.textContent = text;
    preview.style.cssText = "white-space:pre-wrap;overflow-wrap:anywhere;background:#fff;border:1px solid #dfe3d9;padding:12px;font:12px/1.6 'DM Sans',sans-serif;margin-top:12px";
    hint.insertAdjacentElement("afterend", preview);
    return;
  }

  const url = "https://wa.me/" + BUSINESS_WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text);
  window.open(url, "_blank", "noopener,noreferrer");
});

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));
document.getElementById("year").textContent = new Date().getFullYear();
