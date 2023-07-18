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

const titleElement = document.querySelector('.profile__title');
const subtitleElement = document.querySelector('.profile__subtitle');

const popupEditElement = document.querySelector('.popup_type_edit');
const editFormElement = popupEditElement.querySelector('.popup__form');
const inputNameElement = popupEditElement.querySelector('.popup__input_edit_name');
const inputDescriptionElement = popupEditElement.querySelector('.popup__input_edit_description');
const submitEditElement = popupEditElement.querySelector('.popup__save-button');
const inputEditList = Array.from(popupEditElement.querySelectorAll('.popup__input'));

const popupAddElement = document.querySelector('.popup_type_add');
const addFormElement = popupAddElement.querySelector('.popup__form');
const inputNameImageElement = popupAddElement.querySelector('.popup__input_edit_name');
const inputDescriptionImageElement = popupAddElement.querySelector('.popup__input_edit_description');
const submitAddElement = popupAddElement.querySelector('.popup__save-button');
const inputAddList = Array.from(popupAddElement.querySelectorAll('.popup__input'));

const popupImageBlockElement = document.querySelector('.popup_type_zoom');
const popupImageElement = popupImageBlockElement.querySelector('.popup__image');
const popupCaptionElement = popupImageBlockElement.querySelector('.popup__caption');

const closeButtons = document.querySelectorAll('.popup__close-button');

const gallaryElement = document.querySelector('.cards');
const templateElement = document.querySelector('.card-template');

const pressEsc = (popup) => (evt) =>{
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
}

function resetError(popup){
  const inputElements = popup.querySelectorAll('.popup__input');
  inputElements.forEach((inputElement) => {
    hideInputError(popup, inputElement, VALIDATION_CONFIG);
  });
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', pressEsc(popup));
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  resetError(popup);
  document.removeEventListener('keydown', pressEsc);
}

function openImageClick(evt) {
  openPopup(popupImageBlockElement);
  popupImageElement.src = evt.target.src;
  popupImageElement.alt = evt.target.alt;
  popupCaptionElement.textContent = evt.target.alt;
}

function createCard({name, link}){
  const cardElement = templateElement.content.cloneNode(true);
  const likeElement = cardElement.querySelector('.cards__like');
  const trashElement = cardElement.querySelector('.cards__trash-button');

  cardElement.querySelector('.cards__title').textContent = name;
  cardElement.querySelector('.cards__image').src = link;
  cardElement.querySelector('.cards__image').alt = name;

  cardElement.querySelector('.cards__image').addEventListener('click', openImageClick);
  likeElement.addEventListener('click', () => likeElement.classList.toggle('cards__like_active'));
  trashElement.addEventListener('click', () => trashElement.closest('.cards__card').remove());

  return cardElement;
}

function addCard(newElement) {
  gallaryElement.prepend(newElement);
}

function editClick() {
  inputNameElement.value = titleElement.textContent;
  inputDescriptionElement.value = subtitleElement.textContent;

  toggleButttonState(inputEditList, submitEditElement, VALIDATION_CONFIG);
  openPopup(popupEditElement);
}

function saveClick(evt) {
  evt.preventDefault();
  titleElement.textContent = inputNameElement.value;
  subtitleElement.textContent = inputDescriptionElement.value;
  closePopup(popupEditElement);
}

function addClick() {
  addFormElement.reset();
  toggleButttonState(inputAddList, submitAddElement, VALIDATION_CONFIG);
  openPopup(popupAddElement);
}

function createClick(evt) {
  evt.preventDefault();
  addCard(createCard({name: inputNameImageElement.value, link: inputDescriptionImageElement.value}));
  closePopup(popupAddElement);
  addFormElement.reset();
}

initialCards.forEach((item) => {
  addCard(createCard(item));
});

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function clickOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(evt.target);
  }
}

editButtonElement.addEventListener('click', editClick);
editFormElement.addEventListener('submit', saveClick);

addButtonElement.addEventListener('click', addClick);
addFormElement.addEventListener('submit', createClick);

popupEditElement .addEventListener("click", clickOverlay);
popupAddElement.addEventListener("click", clickOverlay);
popupImageBlockElement.addEventListener("click", clickOverlay);
