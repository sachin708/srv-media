const header = document.getElementById("header");

window.addEventListener("scroll", () => {

  if (window.scrollY > 50) {
    header.classList.add("header--scrolled");
  } else {
    header.classList.remove("header--scrolled");
  }

});

const navToggle = document.querySelector(".navbar__toggle");
const navMenu = document.querySelector(".navbar__menu");

if(navToggle){

  navToggle.addEventListener("click", () => {

    const expanded =
      navToggle.getAttribute("aria-expanded") === "true";

    navToggle.setAttribute(
      "aria-expanded",
      !expanded
    );

    navMenu.classList.toggle("navbar__menu--active");

  });

}