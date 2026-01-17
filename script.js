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
};

themeBtn.onclick = () => {
  theme = theme === "light" ? "dark" : "light";
  localStorage.setItem("theme", theme);
  applyTheme();
};

applyLang();
applyTheme();