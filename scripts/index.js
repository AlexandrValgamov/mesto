const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const editButtonElement = document.querySelector('.profile__edit-button');
const popupElement = document.querySelector('.popup');
const formElement = document.querySelector('.popup__form');
const closeButtonElement = document.querySelector('.popup__close-button');

const titleElement = document.querySelector('.profile__title');
const subtitleElement = document.querySelector('.profile__subtitle');

const inputNameElement = document.querySelector('.popup__input_edit_name');
const inputDescriptionElement = document.querySelector('.popup__input_edit_description');

const gallaryElement = document.querySelector('.cards');
const templateElement = document.querySelector('.card-template');

function editClick() {
  popupElement.classList.add('popup_opened');

  inputNameElement.value = titleElement.textContent;
  inputDescriptionElement.value = subtitleElement.textContent;
}

function closeClick() {
  popupElement.classList.remove('popup_opened');
}

function saveClick(evt) {
  evt.preventDefault();
  titleElement.textContent = inputNameElement.value;
  subtitleElement.textContent = inputDescriptionElement.value;
  closeClick();
}

function createCard({name, link}){
  const cardElement = templateElement.content.cloneNode(true);
  const trashElement = cardElement.querySelector('.cards__trash-button');

  cardElement.querySelector('.cards__image').src = link;
  cardElement.querySelector('.cards__title').textContent = name;

  trashElement.addEventListener('click', function() {
    trashElement.closest('.cards__card').remove();
    })

  return cardElement;
}

function addCard(card){
  gallaryElement.prepend(card);
}



initialCards.forEach((item) => {
  addCard(createCard(item));
});

editButtonElement.addEventListener('click', editClick);
closeButtonElement.addEventListener('click', closeClick);
formElement.addEventListener('submit', saveClick);
