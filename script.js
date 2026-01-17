const pages = document.querySelectorAll(".page");
const navBtns = document.querySelectorAll(".nav-btn");
const langBtn = document.getElementById("langBtn");
const themeBtn = document.getElementById("themeBtn");
const themeIcon = document.getElementById("themeIcon");

let lang = localStorage.getItem("lang") || "ru";
let theme = localStorage.getItem("theme") || "light";

function applyLang() {
  document.querySelectorAll("[data-lang]").forEach(el => {
    el.classList.toggle("active", el.dataset.lang === lang);
  });
}

function applyTheme() {
  document.body.classList.toggle("dark", theme === "dark");
  themeIcon.src =
    theme === "dark"
      ? "images/nighticon.svg"
      : "images/dayicon.svg";
}

navBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    navBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    pages.forEach(p => {
      p.classList.toggle("active", p.dataset.page === btn.dataset.page);
    });

    applyLang();
  });
});

langBtn.onclick = () => {
  lang = lang === "ru" ? "en" : "ru";
  localStorage.setItem("lang", lang);

  applyLang();

  // ⬅️ ВАЖНО: пересчитать индикатор после смены текста
  requestAnimationFrame(updateIndicator);
};

themeBtn.onclick = () => {
  theme = theme === "light" ? "dark" : "light";
  localStorage.setItem("theme", theme);
  applyTheme();
};

applyLang();
applyTheme();

const navCenter = document.querySelector(".nav-center");
const navIndicator = document.createElement("div");
navIndicator.classList.add("nav-indicator");
navCenter.appendChild(navIndicator);

function updateIndicator() {
  const activeBtn = document.querySelector(".nav-btn.active");
  if (!activeBtn) return;
  const rect = activeBtn.getBoundingClientRect();
  const parentRect = navCenter.getBoundingClientRect();
  navIndicator.style.width = rect.width + "px";
  navIndicator.style.left = rect.left - parentRect.left + "px";
}

navBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    navBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    pages.forEach(p => {
      p.classList.toggle("active", p.dataset.page === btn.dataset.page);
    });

    applyLang();
    updateIndicator();
  });
});

// обновляем индикатор при загрузке и при изменении размера окна
window.addEventListener("load", updateIndicator);
window.addEventListener("resize", updateIndicator);

const burgerBtn = document.getElementById("burgerBtn");

burgerBtn.onclick = () => {
  document.querySelector(".nav-center").classList.toggle("show");
};