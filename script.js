const pages = document.querySelectorAll(".page");
const navBtns = document.querySelectorAll(".nav-btn");
const langBtn = document.getElementById("langBtn");
const themeBtn = document.getElementById("themeBtn");
const themeIcon = document.getElementById("themeIcon");
const burgerBtn = document.getElementById("burgerBtn");
const navCenter = document.querySelector(".nav-center");

let lang = localStorage.getItem("lang") || "ru";
let theme = localStorage.getItem("theme") || "light";

/* ---------- LANG ---------- */

function applyLang() {
  document.querySelectorAll(".lang-block").forEach(el => {
    el.classList.toggle("active", el.dataset.lang === lang);
  });

  navBtns.forEach(btn => {
    btn.querySelectorAll("span").forEach(span => {
      span.classList.toggle("active", span.dataset.lang === lang);
    });
  });
}

/* ---------- THEME ---------- */

function applyTheme() {
  document.body.classList.toggle("dark", theme === "dark");
  themeIcon.src =
    theme === "dark"
      ? "images/nighticon.svg"
      : "images/dayicon.svg";
}

/* ---------- INDICATOR ---------- */

const indicator = document.createElement("div");
indicator.className = "nav-indicator";
navCenter.appendChild(indicator);

function updateIndicator() {
  const active = document.querySelector(".nav-btn.active");
  if (!active) return;

  const rect = active.getBoundingClientRect();
  const parent = navCenter.getBoundingClientRect();

  indicator.style.width = rect.width + "px";
  indicator.style.left = rect.left - parent.left + "px";
}

/* ---------- NAV ---------- */

navBtns.forEach(btn => {
  btn.onclick = () => {
    navBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    pages.forEach(p => {
      p.classList.toggle("active", p.dataset.page === btn.dataset.page);
    });

    navCenter.classList.remove("show");
    applyLang();
    requestAnimationFrame(updateIndicator);
  };
});

/* ---------- BUTTONS ---------- */

langBtn.onclick = () => {
  lang = lang === "ru" ? "en" : "ru";
  localStorage.setItem("lang", lang);
  applyLang();
  requestAnimationFrame(updateIndicator);
};

themeBtn.onclick = () => {
  theme = theme === "light" ? "dark" : "light";
  localStorage.setItem("theme", theme);
  applyTheme();
};

burgerBtn.onclick = () => {
  navCenter.classList.toggle("show");
};

/* ---------- INIT ---------- */

window.addEventListener("load", () => {
  applyLang();
  applyTheme();
  updateIndicator();
});

window.addEventListener("resize", updateIndicator);