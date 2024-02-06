import { putLikeCard, unLikeCard, deleteMyCard } from "./api.js";

export function createCard(
  card,
  cardTemplate,
  deleteCard,
  openFullScreen,
  likeCard,
  userId
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");
  const cardId = card._id;
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElement.querySelector(".card__title").textContent = card.name;
  likeCounter.textContent = card.likes.length;

  const isLiked = card.likes.some((like) => like._id === userId);
  if (isLiked) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  if (userId === card.owner._id) {
    deleteButton.classList.remove("card__delete-button-hidden");
    deleteButton.addEventListener("click", () => {
      deleteCard(cardId, cardElement);
    });
  } else {
    deleteButton.classList.add("card__delete-button-hidden");
  }

  cardLikeButton.addEventListener("click", () => {
    likeCard(cardLikeButton, likeCounter, cardId);
  });

  cardImage.addEventListener("click", function () {
    openFullScreen(card);
  });

  return cardElement;
}

export function likeCard(cardLikeButton, likeCounter, cardId) {
  const like = cardLikeButton.classList.contains("card__like-button_is-active")
    ? unLikeCard
    : putLikeCard;
  like(cardId)
    .then((updatedCard) => {
      cardLikeButton.classList.toggle("card__like-button_is-active");
      likeCounter.textContent = updatedCard.likes.length;
    })
    .catch((error) => {
      console.log(error);
    });
}

export function deleteCard(cardId, cardElement) {
  deleteMyCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}
