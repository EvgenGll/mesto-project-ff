
import { OpenFullScreen } from '../pages/index.js';

const card = document.querySelector('#card-template').content;

export function createCard(name, link, deleteCard) {
  const cardElement = card.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const image = cardElement.querySelector('.card__image');
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = name;
  cardElement.querySelector('.card__title').textContent = name;
  
  deleteButton.addEventListener('click', function (event) {
    deleteCard(event)
});
image.addEventListener('click', function() {
  OpenFullScreen(name, link);
});

const cardLikeButton = cardElement.querySelector('.card__like-button');
function LikeCard() {
cardLikeButton.classList.toggle('card__like-button_is-active');
}
cardLikeButton.addEventListener('click', LikeCard);
  return cardElement;
}


