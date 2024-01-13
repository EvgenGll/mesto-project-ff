 function handleModalClick(popup) {
  if (popup.key === 'Escape') {
    CloseModal(document.querySelector('.popup_is-opened'))
  }
}

 function CloseOverlay(event) {
  if (event.target.classList.contains('popup_is-opened')) {
    return CloseModal(event.target);
  }
  if (event.target.closest('.popup__close')) {
    return CloseModal(event.target.closest('.popup'));
  }
}

function OpenModal(popup) {
  popup.classList.add('popup_is-animated');
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleModalClick);
}


function CloseModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.addEventListener('keydown', handleModalClick);
  }

export { OpenModal, CloseModal, CloseOverlay };