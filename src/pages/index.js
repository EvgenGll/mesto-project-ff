import "./index.css";

import { openModal, closeModal, closeOverlay } from "../components/modal.js";

import { createCard, likeCard, deleteCard } from "../components/card.js";

import {
  enableValidation,
  clearValidation,
  validationConfig,
} from "../components/validation.js";

import {
  getUserInfo,
  getInitialCards,
  getInitialInfo,
  editProfile,
  postNewCard,
  updateUserAvatar,
} from "../components/api.js";

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

const popupProfile = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const editSaveButton = popupProfile.querySelector(".popup__button");

const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const popupCloseProfile = popupProfile.querySelector(".popup__close");
const popupCloseNewCard = popupNewCard.querySelector(".popup__close");

const formElement = document.forms["edit-profile"];
const nameProfileInput = formElement.querySelector(".popup__input_type_name");
const jobProfileInput = formElement.querySelector(
  ".popup__input_type_description"
);
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const popupForm = popupNewCard.querySelector(".popup__form");
const nameInput = popupForm.querySelector(".popup__input_type_card-name");
const linkInput = popupForm.querySelector(".popup__input_type_url");

const profileImageButton = document.querySelector(".profile__image-cover");
const profileImage = document.querySelector(".profile__image");
const profilePopupAvatar = document.querySelector(".popup_type_avatar");
const closeProfileButton = profilePopupAvatar.querySelector(".popup__close");
const profileFormAvatar = document.forms["avatar_edit"];
const profileLinkInput = profileFormAvatar.querySelector(".popup__input_type_url");
const profileSaveButton = profilePopupAvatar.querySelector(".popup__button");

function addCard(
  card,
  createCard,
  cardTemplate,
  deleteCard,
  openFullScreen,
  likeCard,
  userId
) {
  const cardElement = createCard(
    card,
    cardTemplate,
    deleteCard,
    openFullScreen,
    likeCard,
    userId
  );
  placesList.append(cardElement);
}

/// Функция заполнения карточками
function fillCards(initialCards, userId) {
  initialCards.forEach((card) => {
    addCard(
      card,
      createCard,
      cardTemplate,
      deleteCard,
      openFullScreen,
      likeCard,
      userId
    );
  });
}

/// Функция, пока данные сохраняются
const showLoading = (isLoading, button) => {
  button.textContent = isLoading ? "Сохранение..." : "Сохранить";
};

/// Функция открытия изображения карточки на фуллскрин
function openFullScreen(card) {
  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupCaption.textContent = card.name;
  openModal(popupTypeImage);
}

profileEditButton.addEventListener("click", function () {
  openModal(popupProfile);
  saveInputs();
  clearValidation(formElement, validationConfig);
});

popupCloseProfile.addEventListener("click", function () {
  closeModal(popupProfile);
});

/// Функция сохранения полей ввода формы
function saveInputs() {
  nameProfileInput.value = profileName.textContent;
  jobProfileInput.value = profileDescription.textContent;
}

/// Функция редактирования профиля
function handleEditForm(evt) {
  evt.preventDefault();
  const nameInputValue = nameProfileInput.value;
  const jobInputValue = jobProfileInput.value;
  showLoading(true, popupProfile.querySelector(".popup__button"));
  editSaveButton.disabled = true;
  editProfile(nameInputValue, jobInputValue)
    .then((res) => {
      profileName.textContent = res.name;
      profileDescription.textContent = res.about;
      closeModal(popupProfile);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      showLoading(false, popupProfile.querySelector(".popup__button"));
    });
}

profileImageButton.addEventListener("click", () => {
  openModal(profilePopupAvatar);
  profileFormAvatar.reset();
  clearValidation(profileFormAvatar, validationConfig);
});

closeProfileButton.addEventListener("click", () => {
  closeModal(profilePopupAvatar);
});

/// Функция редактирования аватара
function handleProfileAvatar(evt) {
  evt.preventDefault();
  const linkValue = profileLinkInput.value;
  profileImage.style.backgroundImage = linkValue;
  showLoading(true, profilePopupAvatar.querySelector(".popup__button"));
  profileSaveButton.disabled = true;
  updateUserAvatar(linkValue)
    .then((res) => {
      profileImage.style.backgroundImage = `url('${res.avatar}')`;
      closeModal(profilePopupAvatar);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      profileFormAvatar.reset();
      showLoading(false, profileFormAvatar.querySelector(".popup__button"));
    });
}

profileFormAvatar.addEventListener("submit", handleProfileAvatar);

formElement.addEventListener("submit", handleEditForm);

/// Функция добавления карточек на страницу
function handleAddCard(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const linkValue = linkInput.value;
  showLoading(true, popupForm.querySelector(".popup__button"));
  profileSaveButton.disabled = true;
  postNewCard(nameValue, linkValue)
    .then((card) => {
      const newCard = createCard(
        card,
        cardTemplate,
        deleteCard,
        openFullScreen,
        likeCard,
        userId
      );
      placesList.prepend(newCard);
      closeModal(popupNewCard);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      popupForm.reset();
      showLoading(false, popupForm.querySelector(".popup__button"));
    });
}

popupForm.addEventListener("submit", handleAddCard);

profileAddButton.addEventListener("click", function () {
  openModal(popupNewCard);
});

popupCloseNewCard.addEventListener("click", function () {
  closeModal(popupNewCard);
});

popupTypeImage.addEventListener("click", closeOverlay);

popupNewCard.addEventListener("click", closeOverlay);

popupProfile.addEventListener("click", closeOverlay);

profilePopupAvatar.addEventListener("click", closeOverlay);

let userId;

getInitialInfo();
Promise.all([getUserInfo(), getInitialCards()])
  .then((array) => {
    const [userList, initialCards] = array;
    profileName.textContent = userList.name;
    profileDescription.textContent = userList.about;
    userId = userList._id;
    profileImage.style.backgroundImage = `url(${userList.avatar})`;
    fillCards(initialCards, userId);
  })
  .catch((error) => {
    console.log(error);
  });

enableValidation(validationConfig);
