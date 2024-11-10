import { fetchImages } from './js/pixabay-api';
// import { renderGallery, showError } from './js/render-functions';
import { renderGallery, showError } from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector('#search-form');
const galleryContainer = document.querySelector('.gallery');
const loader = document.getElementById('loader'); 
const loadMoreButton = document.createElement('button');
loadMoreButton.textContent = 'Load more';
loadMoreButton.classList.add('load-more');
galleryContainer.insertAdjacentElement('afterend', loadMoreButton);

let lightbox = new SimpleLightbox('.gallery a');
let query = '';
let page = 1;
let totalHits = 0;

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    query = searchForm.elements['imageSearch']?.value.trim();
  
    if (!query) {
        showError('Please enter a valid search query');
        return;
    }

    page = 1;
    loadMoreButton.style.display = 'none';
    galleryContainer.innerHTML = '';
    loader.style.display = 'block'; 

    try {
        const { images, totalHits: fetchedTotalHits } = await fetchImages(query, page);
        totalHits = fetchedTotalHits;

        renderGallery(images);
        lightbox.refresh();
        if (totalHits > page * 15) loadMoreButton.style.display = 'block';
    } catch (error) {
        showError(error.message);
    } finally {
        loader.style.display = 'none';
    }
});

loadMoreButton.addEventListener('click', async () => {
    page += 1;
    loader.style.display = 'block';

    try {
        const { images } = await fetchImages(query, page);
        renderGallery(images, true);
        lightbox.refresh();
        
        if (page * 15 >= totalHits) {
            loadMoreButton.style.display = 'none';
            showError("We're sorry, but you've reached the end of search results.");
        } else {
            smoothScroll();
        }
    } catch (error) {
        showError(error.message);
    } finally {
        loader.style.display = 'none';
    }
});

function smoothScroll() {
    const { height: cardHeight } = galleryContainer.firstElementChild.getBoundingClientRect();
    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    });
}
    
    
