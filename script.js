(() => {
  const body = document.body;
  const openButton = document.querySelector(".open-menu");
  const closeButton = document.querySelector(".close-menu");
  const overlay = document.querySelector(".overlay");
  const navLinks = document.querySelectorAll(".nav-link");
  const mobileQuery = window.matchMedia("(max-width: 767px)");

  function setDropdown(link, open) {
    link.classList.toggle("link-open", open);
    link.setAttribute("aria-expanded", String(open));
  }

  function closeDropdowns(except) {
    navLinks.forEach((link) => {
      if (link !== except) setDropdown(link, false);
    });
  }

  function setMenu(open) {
    body.classList.toggle("menu-open", open);
    openButton.setAttribute("aria-expanded", String(open));
    if (open) closeButton.focus();
    else openButton.focus();
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const open = !link.classList.contains("link-open");
      // On desktop only one dropdown is open at a time; on mobile they expand inline.
      if (!mobileQuery.matches) closeDropdowns(link);
      setDropdown(link, open);
    });
  });

  openButton.addEventListener("click", () => setMenu(true));
  closeButton.addEventListener("click", () => setMenu(false));
  overlay.addEventListener("click", () => setMenu(false));

  // Close desktop dropdowns when clicking anywhere outside the navigation items.
  document.addEventListener("click", (event) => {
    if (!mobileQuery.matches && !event.target.closest(".nav__item")) closeDropdowns();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    closeDropdowns();
    if (body.classList.contains("menu-open")) setMenu(false);
  });

  // Reset menu state when switching between mobile and desktop layouts.
  mobileQuery.addEventListener("change", () => {
    body.classList.remove("menu-open");
    openButton.setAttribute("aria-expanded", "false");
    closeDropdowns();
  });
})();
