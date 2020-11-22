import galleryItems from './gallery-items.js';

const galleryContainer = document.querySelector(".js-gallery");
const modal = document.querySelector(".js-lightbox");
const modalImg = document.querySelector(".lightbox__image");
const modalContent = document.querySelector(".lightbox__image");
const overlay = document.querySelector(".lightbox__overlay")
const modalBtnClose = document.querySelector(".lightbox__button");

galleryContainer.addEventListener('click', modalOpen);
galleryContainer.insertAdjacentHTML("beforeend", galleryCardMarkup(galleryItems));
   
/* Создание и рендер разметки по массиву данных и предоставленному шаблону */

function galleryCardMarkup(img) {
    return img.map(({ preview, original, description }) => {
    return `<li class="gallery__item">
    <a class="gallery__link"
    href=${original}>
    <img class="gallery__image"
    src=${preview}
    data-source=${original}
    alt=${description} />
    </a>
    </li>`}).join("");
};

/* Открытие модального окна по клику на элементе галереи. */

function modalOpen(event) {
    event.preventDefault();

    if (event.target.nodeName !== "IMG") {
    return};

    modal.classList.add("is-open");
    modalImg.src = event.target.dataset.source;
    modalImg.alt = event.target.alt;
    overlay.addEventListener("click", modalCloseByOverlayClick);
    document.addEventListener("keydown", modalCloseByEsc);
    modalBtnClose.addEventListener('click', modalClose);
    window.addEventListener("keydown", modalImgScrolling);
    modalContent.addEventListener("click", modalImgScrolling);   
};

/* Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"]. */

function modalClose(event) {
    modal.classList.remove("is-open");
    overlay.removeEventListener("click", modalCloseByOverlayClick);
    document.removeEventListener("keydown", modalCloseByEsc);
    modalBtnClose.removeEventListener('click', modalClose);
    window.removeEventListener("keydown", modalImgScrolling);
    modalContent.removeEventListener("click", modalImgScrolling);
};

/* 
- Закрытие модального окна по клику на div.lightbox__overlay.
- Закрытие модального окна по нажатию клавиши ESC.
- Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо". 
*/

function modalCloseByEsc(event) {
    if (event.code === "Escape") {
        modalClose(event)        
    }
};

function modalCloseByOverlayClick(event) {
    if (event.currentTarget === event.target) {
        modalClose(event)      
    }
};

function modalImgScrolling(event) {

    let imgIndex = galleryItems.findIndex(img => img.original === modalImg.src);

    if (event.code === 'ArrowLeft' || event.code === 'ArrowDown') {
        if (imgIndex === 0) {
        imgIndex += galleryItems.length;}
        imgIndex -= 1;
    };

    if (event.code === 'ArrowRight' || event.code === 'ArrowUp' || modalContent === event.target) {
        if (imgIndex === galleryItems.length - 1) {
        imgIndex -= galleryItems.length;}
        imgIndex += 1;
    };

    modalImg.src = galleryItems[imgIndex].original;
    modalImg.alt = galleryItems[imgIndex].description;

};