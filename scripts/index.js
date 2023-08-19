import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js'
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import { initialCards, VALIDATION_CONFIG } from './data.js';
import UserInfo from './UserInfo.js';

const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupProfileAddButton = document.querySelector('.profile__add-button');
const popupEditElement = document.querySelector('.popup_type_edit');
const formEditElement = popupEditElement.querySelector('.popup__form');
const inputNameElement = popupEditElement.querySelector('.popup__input_edit_name');
const inputDescriptionElement = popupEditElement.querySelector('.popup__input_edit_description');
const popupAddElement = document.querySelector('.popup_type_add');
const formAddElement = popupAddElement.querySelector('.popup__form');

function resetError(popup, classElement){
  const inputElements = popup.querySelectorAll('.popup__input');
  inputElements.forEach((inputElement) => {
    classElement.hideInputError(inputElement);
  });
}

const userInfo = new UserInfo('.profile__title', '.profile__subtitle');

const popupWithImage = new PopupWithImage('.popup_type_zoom');

popupWithImage.setEventListeners();

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, '.card-template', handleCardClick);

      cardsList.addItem(card.createCard());
    },
  },
  '.cards'
);

cardsList.renderItems();

const popupProfile = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: ({ name, info }) => {
    popupProfile.close();
    userInfo.setUserInfo(name, info);
  }
});

popupProfile.setEventListeners();

popupProfileOpenButton.addEventListener('click', () => {
  inputNameElement.value = userInfo.getUserInfo().name;
  inputDescriptionElement.value = userInfo.getUserInfo().info;
  formProfileValidation.toggleButttonState();
  resetError(popupEditElement, formProfileValidation);
  popupProfile.open();
});

const PopupAddCard = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleFormSubmit: ({ name, link }) => {
    PopupAddCard.close();
    const card = new Card({ name, link }, '.card-template', handleCardClick);
    cardsList.addItem(card.createCard());
  }
});

PopupAddCard.setEventListeners();

popupProfileAddButton.addEventListener('click', () => {
  formAddElement.reset();
  formImageValidation.toggleButttonState();
  resetError(popupAddElement, formImageValidation);
  PopupAddCard.open();
});

const formProfileValidation = new FormValidator(VALIDATION_CONFIG, formEditElement);
formProfileValidation.enableValidation();

const formImageValidation = new FormValidator(VALIDATION_CONFIG, formAddElement);
formImageValidation.enableValidation();
