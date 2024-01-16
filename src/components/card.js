const card = document.querySelector("#card-template").content;

export function createCard(name, link, deleteCard, openFullScreen, likeCard) {
  const cardElement = card.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const image = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  deleteButton.addEventListener("click", function (event) {
    deleteCard(event);
  });
  image.src = link;
  image.alt = name;
  cardElement.querySelector(".card__title").textContent = name;

  image.addEventListener("click", function () {
    openFullScreen(name, link);
  });

  cardLikeButton.addEventListener("click", likeCard);
  return cardElement;
}

export function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
