import { waitForElement } from "./common.js";

waitForElement("btn-en", (btnEn) => {
  waitForElement("btn-en-mobile", (btnEnMobile) => {
    const btnZh = document.getElementById("btn-zh");
    const btnZhMobile = document.getElementById("btn-zh-mobile");

    // Load saved language or default to English
    let current = localStorage.getItem("lang") || "en";
    applyLanguage(current);

    // Button event listeners
    const enFunction = function () {
      if (current !== "en") {
        current = "en";
        localStorage.setItem("lang", current);
        applyLanguage(current);
      }
    };

    const zhFunction = function () {
      if (current !== "zh") {
        current = "zh";
        localStorage.setItem("lang", current);
        applyLanguage(current);
      }
    };

    btnEn.addEventListener("click", enFunction);
    btnZh.addEventListener("click", zhFunction);
    btnEnMobile.addEventListener("click", enFunction);
    btnZhMobile.addEventListener("click", zhFunction);
  });
});

function applyLanguage(lang) {
  document.documentElement.lang = lang;
  waitForElement("btn-en", (btnEn) => {
    waitForElement("btn-en-mobile", (btnEnMobile) => {
      const btnZh = document.getElementById("btn-zh");
      const btnZhMobile = document.getElementById("btn-zh-mobile");

      if (lang === "zh") {
        document.documentElement.classList.add("zh-mode");
        document.documentElement.classList.remove("en-mode");
        btnZh.classList.add("active");
        btnEn.classList.remove("active");
        btnZhMobile.classList.add("active");
        btnEnMobile.classList.remove("active");
      } else {
        document.documentElement.classList.add("en-mode");
        document.documentElement.classList.remove("zh-mode");
        btnEn.classList.add("active");
        btnZh.classList.remove("active");
        btnEnMobile.classList.add("active");
        btnZhMobile.classList.remove("active");
      }
    });
  });
}
