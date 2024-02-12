"use strict"

document.addEventListener("click", clickEvents);

function clickEvents(e) {
   const targetElement = e.target;

   if (targetElement.closest(".icon-menu")) {
      document.documentElement.classList.toggle("menu-open");
   }
}