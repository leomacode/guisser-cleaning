/* ============================================================
   Guisser Cleaning Service B.V. — interactions
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Mobile navigation ---------- */
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Menu sluiten" : "Menu openen");
    });

    // Close menu after tapping a link (mobile)
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Menu openen");
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reveals = document.querySelectorAll(".reveal");

  if (reduced || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Enquiry CTAs ----------
     "Vraag Nu Aan" + "Toevoegen aan Aanvraag" scroll the
     visitor down to the contact form.                        */
  function scrollToContact() {
    const contact = document.getElementById("contact");
    if (contact) contact.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
  }

  document.querySelectorAll(".enquire").forEach(function (btn) {
    btn.addEventListener("click", scrollToContact);
  });

  const enhanceLink = document.querySelector(".link-arrow");
  if (enhanceLink) {
    enhanceLink.addEventListener("click", function (e) {
      e.preventDefault();
      scrollToContact();
    });
  }

  /* ---------- Contact form validation ---------- */
  const form = document.getElementById("enquiry-form");
  const success = document.getElementById("form-success");

  function setError(field, message) {
    const input = form.elements[field];
    const slot = form.querySelector('.error[data-for="' + field + '"]');
    if (input) input.classList.toggle("invalid", Boolean(message));
    if (slot) slot.textContent = message || "";
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      let ok = true;

      const name = form.elements["name"].value.trim();
      const email = form.elements["email"].value.trim();

      if (!name) { setError("name", "Vul uw naam in."); ok = false; }
      else setError("name", "");

      if (!email) { setError("email", "Vul uw e-mailadres in."); ok = false; }
      else if (!emailRe.test(email)) { setError("email", "Voer een geldig e-mailadres in."); ok = false; }
      else setError("email", "");

      if (!ok) {
        if (success) success.hidden = true;
        const firstInvalid = form.querySelector(".invalid");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Success (front-end demo — no backend wired up)
      if (success) success.hidden = false;
      form.reset();
    });

    // Clear an error as soon as the user corrects it
    ["name", "email"].forEach(function (f) {
      const el = form.elements[f];
      if (el) el.addEventListener("input", function () {
        if (el.classList.contains("invalid")) setError(f, "");
      });
    });
  }

  /* ---------- Footer year ---------- */
  const yearSpan = document.querySelector("[data-year]");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
})();
