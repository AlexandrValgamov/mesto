import './index.css';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js'
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import UserInfo from '../scripts/components/UserInfo.js';
import {
  initialCards,
  VALIDATION_CONFIG,
  popupProfileOpenButton,
  popupProfileAddButton,
  popupEditElement,
  formEditElement,
  inputNameElement,
  inputDescriptionElement,
  popupAddElement,
  formAddElement
} from '../scripts/utils/constants.js';

const userInfo = new UserInfo('.profile__title', '.profile__subtitle');

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

const popupWithImage = new PopupWithImage('.popup_type_zoom');

popupWithImage.setEventListeners();

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

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
  formProfileValidation.resetError();
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
  formImageValidation.resetError();
  PopupAddCard.open();
});

const formProfileValidation = new FormValidator(VALIDATION_CONFIG, formEditElement);
formProfileValidation.enableValidation();

const formImageValidation = new FormValidator(VALIDATION_CONFIG, formAddElement);
formImageValidation.enableValidation();
