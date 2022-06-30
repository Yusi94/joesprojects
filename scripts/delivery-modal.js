const modal = document.querySelector('[data-delivery-modal]');
const openModal = document.querySelector('[data-open-modal-btn]');
const closeModal = document.querySelector('[data-close-btn]');

openModal.addEventListener('click', () => {
    modal.showModal();
    modal.style.opacity = '1';
    closeModal.setAttribute('aria-pressed', false);
});

closeModal.addEventListener('click', () => {
    modal.close();
    closeModal.setAttribute('aria-pressed', true);
});