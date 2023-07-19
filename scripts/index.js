const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupProfileAddButton = document.querySelector('.profile__add-button');
const titleElement = document.querySelector('.profile__title');
const subtitleElement = document.querySelector('.profile__subtitle');

const popupEditElement = document.querySelector('.popup_type_edit');
const formEditElement = popupEditElement.querySelector('.popup__form');
const inputNameElement = popupEditElement.querySelector('.popup__input_edit_name');
const inputDescriptionElement = popupEditElement.querySelector('.popup__input_edit_description');
const popupEditButton = popupEditElement.querySelector('.popup__save-button');
const inputEditList = Array.from(popupEditElement.querySelectorAll('.popup__input'));

const popupAddElement = document.querySelector('.popup_type_add');
const formAddElement = popupAddElement.querySelector('.popup__form');
const inputNameImageElement = popupAddElement.querySelector('.popup__input_edit_name');
const inputDescriptionImageElement = popupAddElement.querySelector('.popup__input_edit_description');
const popupAddButton = popupAddElement.querySelector('.popup__save-button');
const inputAddList = Array.from(popupAddElement.querySelectorAll('.popup__input'));

const popupImageBlockElement = document.querySelector('.popup_type_zoom');
const popupImageElement = popupImageBlockElement.querySelector('.popup__image');
const popupCaptionElement = popupImageBlockElement.querySelector('.popup__caption');

const popupElements = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.popup__close-button');

const gallaryElement = document.querySelector('.cards');
const templateElement = document.querySelector('.card-template');

function resetError(popup){
  const inputElements = popup.querySelectorAll('.popup__input');
  inputElements.forEach((inputElement) => {
    hideInputError(popup, inputElement, VALIDATION_CONFIG);
  });
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

const closePopupByEsc = (evt) =>{
  if (evt.key === 'Escape') {
    const popup = Array.from(popupElements).find((elem) => {
      return elem.classList.contains('popup_opened');
    })
    closePopup(popup);
  }
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
  const imageElement = cardElement.querySelector('.cards__image');

  cardElement.querySelector('.cards__title').textContent = name;
  imageElement.src = link;
  imageElement.alt = name;

  imageElement.addEventListener('click', openImageClick);
  likeElement.addEventListener('click', () => likeElement.classList.toggle('cards__like_active'));
  trashElement.addEventListener('click', () => trashElement.closest('.cards__card').remove());

  return cardElement;
}

function addCard(newElement) {
  gallaryElement.prepend(newElement);
}

function openPopupProfile() {
  inputNameElement.value = titleElement.textContent;
  inputDescriptionElement.value = subtitleElement.textContent;

  toggleButttonState(inputEditList, popupEditButton, VALIDATION_CONFIG);
  resetError(popupEditElement);
  openPopup(popupEditElement);
}

function savePopupProfile(evt) {
  evt.preventDefault();
  titleElement.textContent = inputNameElement.value;
  subtitleElement.textContent = inputDescriptionElement.value;
  closePopup(popupEditElement);
}

function openPopupAddCard() {
  formAddElement.reset();
  toggleButttonState(inputAddList, popupAddButton, VALIDATION_CONFIG);
  resetError(popupAddElement);
  openPopup(popupAddElement);
}

function createNewCard(evt) {
  evt.preventDefault();
  addCard(createCard({name: inputNameImageElement.value, link: inputDescriptionImageElement.value}));
  closePopup(popupAddElement);
  formAddElement.reset();
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

popupProfileOpenButton.addEventListener('click', openPopupProfile);
formEditElement.addEventListener('submit', savePopupProfile);

popupProfileAddButton.addEventListener('click', openPopupAddCard);
formAddElement.addEventListener('submit', createNewCard);

popupEditElement .addEventListener("mousedown", clickOverlay);
popupAddElement.addEventListener("mousedown", clickOverlay);
popupImageBlockElement.addEventListener("mousedown", clickOverlay);
