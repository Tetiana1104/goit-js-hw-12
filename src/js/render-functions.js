export function renderGallery(images, append = false) {
    const galleryContainer = document.querySelector('.gallery');
    const markup = images.map(image => `
    
        <div class="image-card">
            <a href="${image.largeImageURL}">
                <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
            </a>
            <div class="image-info">
                <span>💖 ${image.likes}</span>
                <span>👀 ${image.views}</span>
                <span>💬 ${image.comments}</span>
                <span>📥 ${image.downloads}</span>
            </div>
        </div>
    `).join('');

    if (append) {
        galleryContainer.insertAdjacentHTML('beforeend', markup);
    } else {
        galleryContainer.innerHTML = markup;
    }

}

export function showError(message) {
    iziToast.error({
        title: 'Error',
        message: message,
        position: 'topRight',
        color: 'red',
    });
}