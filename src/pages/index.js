
import './index.css';

import { initialCards } from '../components/cards.js';

import { OpenModal, CloseModal, CloseOverlay } from '../components/modal.js';

import { createCard } from '../components/card.js';

const placesList = document.querySelector('.places__list');

const popupProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');

const ProfileEditButton = document.querySelector('.profile__edit-button');
const ProfileAddButton = document.querySelector('.profile__add-button');

const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const popupCloseProfile = popupProfile.querySelector('.popup__close');
const popupCloseNewCard = popupNewCard.querySelector('.popup__close');

const formElement = document.forms['edit-profile'];
const nameProfileInput = formElement.querySelector('.popup__input_type_name');
const jobProfileInput = formElement.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const popupForm = popupNewCard.querySelector('.popup__form');
const nameInput = popupForm.querySelector('.popup__input_type_card-name');
const linkInput = popupForm.querySelector('.popup__input_type_url');

function deleteCard() {
  const listItem = event.target.closest('.places__item');
  listItem.remove();
}

export function OpenFullScreen(name, link) {
  popupImage.src = link;
  popupCaption.textContent = name;
  OpenModal(popupTypeImage);
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  const nameInputValue = nameProfileInput.value;
  const jobInputValue = jobProfileInput.value;
  /*nameProfileInput.value = profileName.textContent;
  jobProfileInput.value = profileDescription.textContent;*/

  const setProfile = ({ name, description }) => {
    profileName.textContent = name;
    profileDescription.textContent = description;
  }
  setProfile(nameInputValue, jobInputValue);

  profileName.replaceWith(nameInputValue);
  profileDescription.replaceWith(jobInputValue);

  formElement.reset();
  CloseModal(document.querySelector('.popup_is-opened'));
}

formElement.addEventListener('submit', handleFormSubmit); 


popupForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const linkValue = linkInput.value;
  const newCard = createCard(nameValue, linkValue, deleteCard);

  placesList.prepend(newCard);
  popupForm.reset();

  CloseModal(document.querySelector('.popup_is-opened'));
});


ProfileEditButton.addEventListener('click', function () {
  OpenModal(popupProfile);
});

popupCloseProfile.addEventListener('click', function () {
  CloseModal(popupProfile);
})

ProfileAddButton.addEventListener('click', function () {
  OpenModal(popupNewCard);
})

popupCloseNewCard.addEventListener('click', function () {
  CloseModal(popupNewCard);
})

popupTypeImage.addEventListener('click', CloseOverlay);
popupNewCard.addEventListener('click', CloseOverlay);

popupProfile.addEventListener('click', CloseOverlay);

initialCards.forEach(item => placesList.append(createCard(item.name, item.link, deleteCard)));