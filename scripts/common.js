
// Use this callback for elements that are generated 
// by fetch(). These elements are not generated when the DOM
// is loaded.
export function waitForElement(id, callback) {
  const el = document.getElementById(id);
  if (el) {
    callback(el);
  } else {
    // Retry after 50ms
    setTimeout(() => waitForElement(id, callback), 50);
  }
};
