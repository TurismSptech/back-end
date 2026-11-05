document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".auth-nav, .site-nav").forEach(function (nav) {
    var isAuthNav = nav.classList.contains("auth-nav");
    var toggle = nav.querySelector(isAuthNav ? ".auth-menu-toggle" : ".site-menu-toggle");
    var links = nav.querySelector(isAuthNav ? ".auth-nav-links" : ".links");
    var mobileViewport = window.matchMedia(isAuthNav ? "(max-width: 760px)" : "(max-width: 860px)");

    if (!toggle || !links) {
      return;
    }

    function setMenuOpen(isOpen) {
      nav.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    }

    toggle.addEventListener("click", function () {
      setMenuOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    links.addEventListener("click", function (event) {
      if (event.target.closest("a") && mobileViewport.matches) {
        setMenuOpen(false);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenuOpen(false);
        toggle.focus();
      }
    });

    mobileViewport.addEventListener("change", function (event) {
      if (!event.matches) {
        setMenuOpen(false);
      }
    });
  });
});
