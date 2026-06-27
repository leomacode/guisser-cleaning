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

  /* ---------- Footer year ---------- */
  const yearSpan = document.querySelector("[data-year]");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
})();
