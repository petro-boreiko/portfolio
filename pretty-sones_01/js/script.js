"use strict";

document.addEventListener("click", clickEvents);

function clickEvents(e) {
   const targetElement = e.target;

   if (targetElement.closest(".icon-menu")) {
      document.documentElement.classList.toggle("menu-open");
   }
}

// ?Функція для переносу елементу
function transferElement(
   element, // Наш елемент
   originalParent, // Батько елемента
   newParent, // Новий батько елемента
   sizeToTransfer, // Розмір вюпорта де відбуваються зміни
   placeOriginalParent, // Місце в функції "insertAdjacentElement"
   placeNewParent, // Місце в функції "insertAdjacentElement"
   classAdd // Кдас який додається до html для стилізації елемента
) {
   // Наш елемент
   const elementDoc = document.querySelector(element);
   // Батько елемента
   const originalParentEl = document.querySelector(originalParent);
   // Новий батько елемента
   const newParentEl = document.querySelector(newParent);
   const htmlElement = document.documentElement;
   // Ширина вікна вюпорта
   const widthWindow = htmlElement.clientWidth;

   // Виконується перевіркаю коли має відбутися перестановка
   if (widthWindow < sizeToTransfer) {
      // Якщо наш ел не має класу"done" то...
      if (!elementDoc.classList.contains("done")) {
         // то наш елемент переноситься в нове місце
         newParentEl.insertAdjacentElement(placeNewParent, elementDoc);
         // І добавляємо класс до HTML для стилізації
         htmlElement.classList.add(classAdd);
      }
   } else {
      //  Якщо HTML має даний клас то...
      if (htmlElement.classList.contains(classAdd)) {
         // Наш елемент переносимо на старе місце
         originalParentEl.insertAdjacentElement(
            placeOriginalParent,
            elementDoc
         );
         // І удаляємо клас з HTML
         htmlElement.classList.remove(classAdd);
      }
   }
}

// прослушка на зміну розміру екрану "resize"
window.addEventListener("resize", function () {
   transferElement(
      ".hero__buttons", // element
      ".hero__body", // originalParent
      ".hero__container", // newParent
      991.98, // sizeToTransfer
      "beforeend", // placeOriginalParent
      "beforeend", //placeNewParent
      "transfer-our-element" // classAdd
   );
});

// добавляємо прослушку "DOMContentLoaded"("load") щоб при загрузці сторінки наш елемунт знаходився де нам потрібно а не на початковому місці

window.addEventListener("DOMContentLoaded", function () {
   transferElement(
      ".hero__buttons", // element
      ".hero__body", // originalParent
      ".hero__container", // newParent
      991.98, // sizeToTransfer
      "beforeend", // placeOriginalParent
      "beforeend", //placeNewParent
      "transfer-our-element" // classAdd
   );
});

// !Tabs start
// навігація табів
const tabsItmes = document.querySelectorAll(".tabs-products__item");
// контент табів
const tabsContent = document.querySelectorAll(".tabs-products__cards");

// перебираємо навігацію
tabsItmes.forEach((item) => {

	// вішаємо прослушку клік
   item.addEventListener("click", function (e) {
      // отримуємо значення атрибуту data-tab нашого елемента
      const itemTarget = e.target.getAttribute("data-tab");

		// ? Позволить забрати клас active і додати клас hidden щоб дані класи використовувалися тільки для одного елемента а не для всіх
		// start
      // забирає активний клас у елумента навігації
      tabsItmes.forEach((element) => {
         element.classList.remove("tabs-products__item--active");
      });

      // додає класс до контенту елементу таба
      tabsContent.forEach((element) => {
         element.classList.add("hidden");
      });
		// end

      // додаємо активний клас у елемента навігації
      item.classList.add("tabs-products__item--active");

		// видаляємо класс по ід 
      document.getElementById(itemTarget).classList.remove("hidden");
   });
});


// Для того щоб при загрузці сторінки одразубув активний один із табів
document
   .querySelector('[data-tab="tabs-products_01"]')
   .classList.add("tabs-products__item--active");

document.querySelector("#tabs-products_01").classList.remove("hidden");

// !Tabs end