function waitForElement(id, callback) {
  const el = document.getElementById(id);
  if (el) {
    callback(el);
  } else {
    // Retry after 50ms
    setTimeout(() => waitForElement(id, callback), 50);
  }
}

waitForElement("btn-en", (btnEn) => {
  // loaded together with btn-en
  const btnZh = document.getElementById("btn-zh");

  // Load saved language or default to English
  let current = localStorage.getItem("lang") || "en";
  applyLanguage(current);

  // Button event listeners
  btnEn.addEventListener("click", () => {
    if (current !== "en") {
      current = "en";
      localStorage.setItem("lang", current);
      applyLanguage(current);
    }
  });

  btnZh.addEventListener("click", () => {
    if (current !== "zh") {
      current = "zh";
      localStorage.setItem("lang", current);
      applyLanguage(current);
    }
  });
});

function applyLanguage(lang) {
  waitForElement("btn-en", (btnEn) => {
    const btnZh = document.getElementById("btn-zh");

    if (lang === "zh") {
      document.documentElement.classList.add("zh-mode");
      document.documentElement.classList.remove("en-mode");
      btnZh.classList.add("active");
      btnEn.classList.remove("active");
    } else {
      document.documentElement.classList.add("en-mode");
      document.documentElement.classList.remove("zh-mode");
      btnEn.classList.add("active");
      btnZh.classList.remove("active");
    }
  });
}
