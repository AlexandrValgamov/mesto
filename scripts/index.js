import Card from './Card.js';
import { FormValidator } from './FormValidator.js';
import Section from './Section.js'
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import { initialCards, VALIDATION_CONFIG } from './data.js';

const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupProfileAddButton = document.querySelector('.profile__add-button');
const titleElement = document.querySelector('.profile__title');
const subtitleElement = document.querySelector('.profile__subtitle');

const popupEditElement = document.querySelector('.popup_type_edit');
const formEditElement = popupEditElement.querySelector('.popup__form');
const inputNameElement = popupEditElement.querySelector('.popup__input_edit_name');
const inputDescriptionElement = popupEditElement.querySelector('.popup__input_edit_description');

const popupAddElement = document.querySelector('.popup_type_add');
const formAddElement = popupAddElement.querySelector('.popup__form');
const inputNameImageElement = popupAddElement.querySelector('.popup__input_edit_name');
const inputDescriptionImageElement = popupAddElement.querySelector('.popup__input_edit_description');

const popupImageBlockElement = document.querySelector('.popup_type_zoom');
const popupImageElement = popupImageBlockElement.querySelector('.popup__image');
const popupCaptionElement = popupImageBlockElement.querySelector('.popup__caption');

const popupElements = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.popup__close-button');

const gallaryElement = document.querySelector('.cards');

function resetError(popup, classElement){
  const inputElements = popup.querySelectorAll('.popup__input');
  inputElements.forEach((inputElement) => {
    //Применяем метод класса FormValidator
    classElement.hideInputError(inputElement);
  });
}

// // Popup
// function openPopup(popup) {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', closePopupByEsc);
// }

// Popup
// function closePopup(popup) {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closePopupByEsc);
// }

// Popup
// const closePopupByEsc = (evt) => {
//   if (evt.key === 'Escape') {

//     const popup = Array.from(popupElements).find((elem) => {
//       return elem.classList.contains('popup_opened');
//     })

//     closePopup(popup);
//   }
// }

// PopupWithImage
// function openImageClick(name, link) {
//   openPopup(popupImageBlockElement);
//   popupImageElement.src = link;
//   popupImageElement.alt = name;
//   popupCaptionElement.textContent = name;
// }

const popupWithImage = new PopupWithImage('.popup_type_zoom');

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

popupWithImage.setEventListeners();

// // Section
// function addCard(newElement) {
//   gallaryElement.prepend(newElement);
// }

function openPopupProfile() {
  inputNameElement.value = titleElement.textContent;
  inputDescriptionElement.value = subtitleElement.textContent;
  //Применяем методы класса FormValidator
  formProfileValidation.toggleButttonState();
  resetError(popupEditElement, formProfileValidation);
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
  //Применяем методы класса FormValidator
  formImageValidation.toggleButttonState();
  resetError(popupAddElement, formImageValidation);
  openPopup(popupAddElement);
}

function createNewCard(evt) {
  evt.preventDefault();
  const card = new Card({name: inputNameImageElement.value, link: inputDescriptionImageElement.value}, '.card-template', openImageClick);
  addCard(card.createCard());
  closePopup(popupAddElement);
  formAddElement.reset();
}

// Section(func)
// initialCards.forEach((item) => {
//   const card = new Card(item, '.card-template', openImageClick);
//   addCard(card.createCard());
// });

const cardsList = new Section ({
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, '.card-template', handleCardClick);

      cardsList.addItem(card.createCard());
    },
  },
  '.cards'
);

cardsList.renderItems();

// Popup
// closeButtons.forEach((button) => {
//   const popup = button.closest('.popup');
//   button.addEventListener('click', () => closePopup(popup));
// });

// Popup
// function clickOverlay(evt) {
//   if (evt.currentTarget === evt.target) {
//     closePopup(evt.target);
//   }
// }
//Создаем экземпляры класса FormValidator
const formProfileValidation = new FormValidator(VALIDATION_CONFIG, formEditElement);
formProfileValidation.enableValidation();

const formImageValidation = new FormValidator(VALIDATION_CONFIG, formAddElement);
formImageValidation.enableValidation();

popupProfileOpenButton.addEventListener('click', openPopupProfile);
formEditElement.addEventListener('submit', savePopupProfile);

popupProfileAddButton.addEventListener('click', openPopupAddCard);
formAddElement.addEventListener('submit', createNewCard);

// popupEditElement.addEventListener("mousedown", clickOverlay);
// popupAddElement.addEventListener("mousedown", clickOverlay);
// popupImageBlockElement.addEventListener("mousedown", clickOverlay);
