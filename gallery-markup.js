import gallery from './gallery-items.js';

const galleryContainer = document.querySelector('.js-gallery');
const imagesMarkup = createImagesGalleryMarkup(gallery);
const lightboxEl = document.querySelector('.js-lightbox');
const modalEl = document.querySelector('.lightbox__overlay');
const lightboxImg = document.querySelector('.lightbox__image');
const button = document.querySelector('[data-action="close-lightbox"]');

galleryContainer.insertAdjacentHTML("beforeend", imagesMarkup);

galleryContainer.addEventListener('click', onGalleryContainerClick);
button.addEventListener('click', removeActiveImage);
modalEl.addEventListener("click", removeActiveImage);

  function createImagesGalleryMarkup(images) {
    return images.map(({preview, original, description}) => {
      return `
      <li class="gallery__item">
        <a
            class="gallery__link"
            href= "${original}"
        >
          <img
            class="gallery__image"
            src= "${preview}"
            data-source= "${original}"
            alt="${description}"
          />
        </a>
      </li>
        `;
    }).join('');
  };

  function onGalleryContainerClick (evt) {
    evt.preventDefault();

    const isImageClickEl = evt.target.classList.contains('gallery__image');
    if (!isImageClickEl) {
      return;
    }

    lightboxEl.classList.add('is-open');

    lightboxImg.src = evt.target.dataset.source;

    window.addEventListener("keydown", pressOnKey);

    // console.log(evt.target.dataset.source);
  };

  function removeActiveImage(evt) {
    lightboxEl.classList.remove('is-open');
  
    lightboxImg.src = '';
    
    window.removeEventListener("keydown", pressOnKey);
  };
  
  function pressOnKey(evt) {
    if (evt.code === "Escape") {
      removeActiveImage(evt);
    }
  };