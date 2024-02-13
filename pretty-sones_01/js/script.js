"use strict"

document.addEventListener("click", clickEvents);

function clickEvents(e) {
   const targetElement = e.target;

   if (targetElement.closest(".icon-menu")) {
      document.documentElement.classList.toggle("menu-open");
   }
}

// Функція для переносу елементу
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

window.addEventListener("resize", function () {
   transferElement(
      ".hero__buttons", // element
      ".hero__body", // originalParent
      ".hero__container", // newParent
      992.98, // sizeToTransfer
      "beforeend", // placeOriginalParent
      "beforeend", //placeNewParent
      "transfer-our-element" // classAdd
   );
});