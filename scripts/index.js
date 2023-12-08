const card = document.querySelector('#card-template').content;

const placesList = document.querySelector('.places__list');

function createCard(name, link, deleteCard) {
    const cardElement = card.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__title').textContent = name;
    deleteButton.addEventListener('click', function (event) {
        deleteCard(event)
    });

    return cardElement;
}

function deleteCard() {
    const listItem = event.target.closest('.places__item');
    listItem.remove();
}

initialCards.forEach(item => placesList.append(createCard(item.name, item.link, deleteCard)));
/*for(let i=0; i < initialCards.length; i++) {
    placesList.append(createCard(initialCards[i].name, initialCards[i].link, deleteCard));
}*/
