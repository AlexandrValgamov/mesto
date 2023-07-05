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
const addButtonElement = document.querySelector('.profile__add-button');
const popupElement = document.querySelector('.popup');
const formElement = document.querySelector('.popup__form');
const closeButtonElement = document.querySelector('.popup__close-button');

const titleElement = document.querySelector('.profile__title');
const subtitleElement = document.querySelector('.profile__subtitle');

const popupTitleElement = document.querySelector('.popup__title');
const popupSaveButtonElement = document.querySelector('.popup__save-button');
const inputNameElement = document.querySelector('.popup__input_edit_name');
const inputDescriptionElement = document.querySelector('.popup__input_edit_description');

const gallaryElement = document.querySelector('.cards');
const templateElement = document.querySelector('.card-template');

function editClick() {
  popupElement.classList.add('popup_opened');

  popupTitleElement.textContent = 'Редактировать профиль';
  inputNameElement.value = titleElement.textContent;
  inputDescriptionElement.value = subtitleElement.textContent;
  popupSaveButtonElement.textContent = 'Сохранить';

  formElement.addEventListener('submit', saveClick);
}

function addClick() {
  popupElement.classList.add('popup_opened');

  popupTitleElement.textContent = 'Новое место';
  inputNameElement.value = 'Название';
  inputDescriptionElement.value = 'Ссылка на картинку';
  popupSaveButtonElement.textContent = 'Создать';

  formElement.addEventListener('submit', addCard);
}

function closeClick() {
  popupElement.classList.remove('popup_opened');
  if (popupTitleElement.textContent === 'Новое место') {
    formElement.removeEventListener('submit', addCard);
  } else {
    formElement.removeEventListener('submit', saveClick);
  }
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

  cardElement.querySelector('.cards__title').textContent = name;
  cardElement.querySelector('.cards__image').src = link;

  trashElement.addEventListener('click', function() {
    trashElement.closest('.cards__card').remove();
    })

  gallaryElement.prepend(cardElement);
}

function addCard(evt) {
  evt.preventDefault();
  createCard({name : inputNameElement.value, link : inputDescriptionElement.value});
  closeClick();
}


initialCards.forEach((item) => {
  createCard(item);
});

editButtonElement.addEventListener('click', editClick);
addButtonElement.addEventListener('click', addClick);
closeButtonElement.addEventListener('click', closeClick);
