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
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var status = document.getElementById("form-status");
    var name = (document.getElementById("f-name").value || "").trim();
    var phone = (document.getElementById("f-phone").value || "").trim();
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
    status.classList.add("ok");
    status.textContent = "Это макет сайта: заявка здесь не отправляется. Позвоните по номеру 8 993 321-48-85 или напишите в WhatsApp. В конструкторе Т-Банка форма будет настроена на реальную отправку.";
  });
})();
