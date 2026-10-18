(function initEmailCopy() {
  const btn = document.querySelector("[data-copy-email]");
  if (!btn) return;

  const email = btn.getAttribute("data-copy-email");
  const label = btn.querySelector(".copy-label");
  const original = label ? label.textContent : "Email";

  function writeClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        resolve();
      } catch (e) {
        reject(e);
      } finally {
        document.body.removeChild(ta);
      }
    });
  }

  btn.addEventListener("click", function () {
    writeClipboard(email).then(function () {
      if (label) label.textContent = "Copied!";
      btn.classList.add("is-copied");
      setTimeout(function () {
        if (label) label.textContent = original;
        btn.classList.remove("is-copied");
      }, 1600);
    }).catch(function () {
      if (label) label.textContent = email;
      setTimeout(function () {
        if (label) label.textContent = original;
      }, 1600);
    });
  });
})();
