const content = {
  subtitle: {
    en: "January 24 - 28 & February 1 - 5",
    zh: "第一梯次：1 月 24 日（週六）至 1 月 28 日（週三）]<br>[translate:第二梯次：2 月 1 日（週日）至 2 月 5 日（週四）",
  },
  location: {
    en: "Wenshan District, Taipei, 2026",
    zh: "文山區，台北，2026",
  },
  applyDeadline: {
    en: "by january 10, 2026",
    zh: "申請至1月10日止",
  },
  // aboutTitle: {
  //   en: "What Is The Compass Fellowship?",
  //   zh: "什麼是 Compass Fellowship?",
  // },
  // aboutContent: {
  //   en: "The Compass Fellowship is a program for curious and ambitious youths interested in reflecting, exploring, and changing themselves and the world. Our accomplished instructors, bringing their diverse life experience, seek to create an immersive experience emphasizing discussion and dialogue, in exploring concepts ranging from cognitive science and economics to practical elements of meditation, and more. It is a five day live-in program, hosted in Taipei, running twice: Jan 24 – Jan 28 & Feb 1 – Feb 5. The program is free to attend with meals and accommodation fully covered. Admissions begin November 15 and are run on a rolling basis.",
  //   zh: "Compass Fellowship 聚集了一群好奇、有抱負/志向、願意反思、探索並改變自我與世界的青年學子，並由具有高度成就、背景多元的講師與導師共同帶領。我們致力於打造一個以深度討論與對話為核心的沉浸式體驗，內容涵蓋從認知科學、經濟學等概念，到實作型的冥想練習等多元主題。<br>這是一個為期五天、全程住宿的課程，地點位於台北，將舉辦兩梯次：1 月 24 日至 1 月 28 日、以及 2 月 1 日至 2 月 5 日。課程完全免費，並提供食宿。<br>招生自 11 月 15 日 起開放，並採 滾動式錄取。",
  // },
  // Add more keys as necessary following this pattern
};

function setInnerHTML(id, value) {
  document.getElementById(id).innerHTML = value;
}

window.addEventListener("DOMContentLoaded", () => {
  setInnerHTML("subtitle-en", content.subtitle.en);
  setInnerHTML("subtitle-zh", content.subtitle.zh);

  setInnerHTML("location-en", content.location.en);
  setInnerHTML("location-zh", content.location.zh);

  setInnerHTML("deadline-en", content.applyDeadline.en);
  setInnerHTML("deadline-zh", content.applyDeadline.zh);

  setInnerHTML("about-title-en", content.aboutTitle.en);
  setInnerHTML("about-title-zh", content.aboutTitle.zh);

  setInnerHTML("about-content-en", content.aboutContent.en);
  setInnerHTML("about-content-zh", content.aboutContent.zh);
});
