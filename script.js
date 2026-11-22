(function () {
  var btn = document.querySelector(".nav-toggle");
  var menu = document.getElementById("menu");
  if (btn && menu) {
    btn.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        menu.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      });
    });
  }

  var form = document.getElementById("lead-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = document.getElementById("form-status");
      var name = (document.getElementById("f-name").value || "").trim();
      var phone = (document.getElementById("f-phone").value || "").trim();
      var question = (document.getElementById("f-message").value || "").trim();
      var agree = document.getElementById("f-agree").checked;
      status.className = "form-status";
      if (!name || !phone) {
        status.classList.add("err");
        status.textContent = "Укажите имя и телефон.";
        return;
      }
      if (!agree) {
        status.classList.add("err");
        status.textContent = "Чтобы отправить заявку, нужно согласие на обработку персональных данных.";
        return;
      }
      var text = "Заявка с сайта tumanov-advokat.ru: Имя " + name + ". Телефон " + phone + ".";
      if (question) text += " Вопрос: " + question;
      var url = "https://wa.me/79933214885?text=" + encodeURIComponent(text);
      status.classList.add("ok");
      status.textContent = "Сейчас откроется WhatsApp с готовым текстом на номер 8 993 321-48-85. Нажмите «Отправить», чтобы сообщение ушло адвокату.";
      window.open(url, "_blank", "noopener");
    });
  }

  if (!document.documentElement.classList.contains("js-motion")) return;

  var revealSel = "main > section:not(.hero), .band, .card, .case, .quote, .step, .certs a, .faq, .facts div";
  var reveals = document.querySelectorAll(revealSel);
  reveals.forEach(function (el) { el.classList.add("reveal"); });
  [".grid-2 .card", ".grid-3 .card", ".cases .case", ".reviews .quote", ".steps .step", ".certs a"].forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el, i) {
      el.style.transitionDelay = (i * 0.09) + "s";
    });
  });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }
  setTimeout(function () {
    document.documentElement.classList.add("motion-fallback");
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }, 4000);

  var photo = document.querySelector(".hero-photo img");
  if (photo && window.matchMedia("(min-width: 981px)").matches) {
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        photo.style.translate = "0 " + Math.min(Math.max(y * 0.1, 0), 56) + "px";
        ticking = false;
      });
    }, { passive: true });
  }
})();

/* v5: лайтбокс для сертификата */
(function () {
  var links = document.querySelectorAll("a[data-lightbox]");
  if (!links.length || typeof HTMLDialogElement !== "function") return;
  var dlg = document.createElement("dialog");
  dlg.className = "lightbox";
  dlg.innerHTML = '<button type="button" aria-label="Закрыть">×</button><img alt="">';
  document.body.appendChild(dlg);
  var img = dlg.querySelector("img");
  dlg.querySelector("button").addEventListener("click", function () { dlg.close(); });
  dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
  links.forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      var inner = a.querySelector("img");
      img.src = a.getAttribute("href");
      img.alt = inner ? inner.alt : "";
      dlg.showModal();
    });
  });
})();
