'use strict'

document.addEventListener('click', clickEvents)

function clickEvents(e) {
   const targetElement = e.target

   if (targetElement.closest('.icon-menu')) {
      document.documentElement.classList.toggle('menu-open')
   }

   if (targetElement.closest('.menu__link')) {
      document.documentElement.classList.remove('menu-open')
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
   const elementDoc = document.querySelector(element)
   // Батько елемента
   const originalParentEl = document.querySelector(originalParent)
   // Новий батько елемента
   const newParentEl = document.querySelector(newParent)
   const htmlElement = document.documentElement
   // Ширина вікна вюпорта
   const widthWindow = htmlElement.clientWidth

   // Виконується перевіркаю коли має відбутися перестановка
   if (widthWindow < sizeToTransfer) {
      // Якщо наш ел не має класу"done" то...
      if (!elementDoc.classList.contains('done')) {
         // то наш елемент переноситься в нове місце
         newParentEl.insertAdjacentElement(placeNewParent, elementDoc)
         // І добавляємо класс до HTML для стилізації
         htmlElement.classList.add(classAdd)
      }
   } else {
      //  Якщо HTML має даний клас то...
      if (htmlElement.classList.contains(classAdd)) {
         // Наш елемент переносимо на старе місце
         originalParentEl.insertAdjacentElement(placeOriginalParent, elementDoc)
         // І удаляємо клас з HTML
         htmlElement.classList.remove(classAdd)
      }
   }
}

// прослушка на зміну розміру екрану "resize"
window.addEventListener('resize', function () {
   transferElement(
      '.hero__buttons', // element
      '.hero__body', // originalParent
      '.hero__container', // newParent
      991.98, // sizeToTransfer
      'beforeend', // placeOriginalParent
      'beforeend', //placeNewParent
      'transfer-our-element' // classAdd
   )
})

// добавляємо прослушку "DOMContentLoaded"("load") щоб при загрузці сторінки наш елемунт знаходився де нам потрібно а не на початковому місці

window.addEventListener('DOMContentLoaded', function () {
   transferElement(
      '.hero__buttons', // element
      '.hero__body', // originalParent
      '.hero__container', // newParent
      991.98, // sizeToTransfer
      'beforeend', // placeOriginalParent
      'beforeend', //placeNewParent
      'transfer-our-element' // classAdd
   )

   document.querySelector('.menu__link--active').classList.add('active')
})

// !Tabs start
// навігація табів
const tabsItmes = document.querySelectorAll('.tabs-products__item')
// контент табів
const tabsContent = document.querySelectorAll('.tabs-products__cards')

// перебираємо навігацію
tabsItmes.forEach((item) => {
   // вішаємо прослушку клік
   item.addEventListener('click', function (e) {
      // отримуємо значення атрибуту data-tab нашого елемента
      const itemTarget = e.target.getAttribute('data-tab')

      // ? Позволить забрати клас active і додати клас hidden щоб дані класи використовувалися тільки для одного елемента а не для всіх
      // start
      // забирає активний клас у елумента навігації
      tabsItmes.forEach((element) => {
         element.classList.remove('tabs-products__item--active')
      })

      // додає класс до контенту елементу таба
      tabsContent.forEach((element) => {
         element.classList.add('hidden')
      })
      // end

      // додаємо активний клас у елемента навігації
      item.classList.add('tabs-products__item--active')

      // видаляємо класс по ід
      document.getElementById(itemTarget).classList.remove('hidden')
   })
})
// Для того щоб при загрузці сторінки одразубув активний один із табів
document
   .querySelector('[data-tab="tabs-products_01"]')
   .classList.add('tabs-products__item--active')

document.querySelector('#tabs-products_01').classList.remove('hidden')
// !Tabs end

// ! Slider start
const testimonialsSlider = document.querySelector('.testimonials')
if (testimonialsSlider) {
   new Swiper('.testimonials__slider', {
      // Optional parameters
      loop: true,
      // autoHeight: true,
      speed: 800,
      spaceBetween: 30,
      slidesPerView: 2,

      // If we need pagination
      pagination: {
         el: '.testimonials__pages',
         clickable: true,
      },

      breakpoints: {
         // when window width is >= 320px
         320: {
            slidesPerView: 1.2,
            spaceBetween: 15,
         },
         // when window width is >= 767px
         660: {
            slidesPerView: 1.5,
            spaceBetween: 20,
         },
         // when window width is >= 992px
         992: {
            slidesPerView: 2,
            spaceBetween: 25,
         },
      },
   })
}

// ! Slider end

// !Animations
let options = {
   threshold: 0.3,
}

let optionTreshold = options.threshold
console.log(optionTreshold)

let callback = (entries, observerAnim) => {
   entries.forEach((entry) => {
      const targetElement = entry.target

      if (entry.isIntersecting) {
         targetElement.classList.add('animation')
      } else {
         targetElement.classList.remove('animation')
      }

      const dataTrheshold = parseFloat(targetElement.dataset.thre)

      if (dataTrheshold) {
         optionTreshold = dataTrheshold
      }
   })
}

console.log(optionTreshold)

const observerAnim = new IntersectionObserver(callback, options)

let someElements = document.querySelectorAll('[data-anim]')

someElements.forEach((someElement) => {
   observerAnim.observe(someElement)
})

// !Active menu element on scroll

if (window.matchMedia('(min-width: 992px)').matches) {
   // Get all sections that have an ID defined
   const sections = document.querySelectorAll('section[id], footer[id]')

   // Add an event listener listening for scroll
   window.addEventListener('scroll', navHighlighter)

   function navHighlighter() {
      // Get current scroll position
      let scrollY = window.scrollY

      // Now we loop through sections to get height, top and ID values for each
      sections.forEach((current) => {
         const sectionHeight = current.offsetHeight

         const sectionTop = current.offsetTop - 400

         const sectionId = current.getAttribute('id')

         if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document
               .querySelector('.menu__body ul li a[href*=' + sectionId + ']')
               .classList.add('active')
         } else {
            document
               .querySelector('.menu__body ul li a[href*=' + sectionId + ']')
               .classList.remove('active')
         }
      })
   }
}
