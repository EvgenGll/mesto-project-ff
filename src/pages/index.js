import "./index.css";

import { initialCards } from "../components/cards.js";

import { openModal, closeModal, closeOverlay } from "../components/modal.js";

import { createCard, likeCard } from "../components/card.js";

const placesList = document.querySelector(".places__list");

const popupProfile = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const popupCloseProfile = popupProfile.querySelector(".popup__close");
const popupCloseNewCard = popupNewCard.querySelector(".popup__close");

const formElement = document.forms["edit-profile"];
const nameProfileInput = formElement.querySelector(".popup__input_type_name");
const jobProfileInput = formElement.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const popupForm = popupNewCard.querySelector(".popup__form");
const nameInput = popupForm.querySelector(".popup__input_type_card-name");
const linkInput = popupForm.querySelector(".popup__input_type_url");

function deleteCard() {
  const listItem = event.target.closest(".places__item");
  listItem.remove();
}

function openFullScreen(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(popupTypeImage);
}

profileEditButton.addEventListener("click", function () {
  openModal(popupProfile);
});
saveInputs();

popupCloseProfile.addEventListener("click", function () {
  closeModal(popupProfile);
});

function saveInputs() {
  nameProfileInput.value = profileName.textContent;
  jobProfileInput.value = profileDescription.textContent;
}

function handleEditForm(evt) {
  evt.preventDefault();
  const nameInputValue = nameProfileInput.value;
  const jobInputValue = jobProfileInput.value;
  profileName.textContent = nameInputValue;
  profileDescription.textContent = jobInputValue;
  closeModal(popupProfile);
}

formElement.addEventListener("submit", handleEditForm);

popupForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const linkValue = linkInput.value;
  const newCard = createCard(nameValue, linkValue, deleteCard);

  placesList.prepend(newCard);
  popupForm.reset();
  closeModal(popupNewCard);
});

profileAddButton.addEventListener("click", function () {
  openModal(popupNewCard);
});

popupCloseNewCard.addEventListener("click", function () {
  closeModal(popupNewCard);
});

popupTypeImage.addEventListener("click", closeOverlay);
popupNewCard.addEventListener("click", closeOverlay);

popupProfile.addEventListener("click", closeOverlay);

initialCards.forEach((item) =>
  placesList.append(createCard(item.name, item.link, deleteCard, openFullScreen, likeCard)));
