import './index.css';
import Api from '../scripts/components/Api.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js'
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithConfirmation from '../scripts/components/PopupWithConfirmation';
import UserInfo from '../scripts/components/UserInfo.js';
import {
  VALIDATION_CONFIG,
  API_CONFIG,
  popupProfileOpenButton,
  popupProfileAddButton,
  popupProfileAvatarButton,
  formEditElement,
  inputNameElement,
  inputDescriptionElement,
  formAddElement,
  formEditAvatar
} from '../scripts/utils/constants.js';

let myId;
const api = new Api(API_CONFIG);

function addCard(item) {
  const card = new Card(item, myId, '.card-template', handleCardClick, handleDeleteClick, handleLikeClick);
  cardsList.addItem(card.createCard());
}

const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar');

const cardsList = new Section(addCard, '.cards');

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([data, user]) => {
    myId = user._id;
    cardsList.renderItems(data);
    userInfo.setUserInfo(user.name, user.about);
    userInfo.setAvatar(user.avatar);
  })
  .catch((err) => {
    console.log(err);
  })

const popupEditAvatar = new PopupWithForm({
  popupSelector: '.popup_type_edit-avatar',
  handleFormSubmit: ({ avatar }) => {
    api.updateAvatar(avatar)
      .then((res => {
        popupEditAvatar.close();
        userInfo.setAvatar(res.avatar);
      }))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEditAvatar.toggleDefaultButtonText();
      })
  },
  textSubmitButton: 'Сохранение...'
});

popupEditAvatar.setEventListeners();

popupProfileAvatarButton.addEventListener('click', () => {
  formEditAvatar.reset();
  formAvatarValidation.toggleButttonState();
  formAvatarValidation.resetErrors();
  popupEditAvatar.open();
});

const popupWithImage = new PopupWithImage('.popup_type_zoom');

popupWithImage.setEventListeners();

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

function handleDeleteClick(card) {
  popupWithConfirmation.open(card);
}

function handleLikeClick(card) {
  if (!card.checkStateOfLike()) {
    api.putLike(card._id)
      .then((res) => {
        card.setLikesCount(res.likes);
        card.toggleLikeButtonState();
      })
      .catch((err) => {
        console.log(err);
      })
  } else {
      api.deleteLike(card._id)
        .then((res) => {
          card.setLikesCount(res.likes);
          card.toggleLikeButtonState();
        })
        .catch((err) => {
          console.log(err);
        })
    }
}

const popupProfile = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: ({ name, info }) => {
    api.updateUserInfo(name, info)
      .then((res) => {
        userInfo.setUserInfo(res.name, res.about);
        popupProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupProfile.toggleDefaultButtonText();
      })
  },
  textSubmitButton: 'Сохранение...'
});

popupProfile.setEventListeners();

popupProfileOpenButton.addEventListener('click', () => {
  const data = userInfo.getUserInfo();
  inputNameElement.value = data.name;
  inputDescriptionElement.value = data.info;
  formProfileValidation.toggleButttonState();
  formProfileValidation.resetErrors();
  popupProfile.open();
});

const popupAddCard = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleFormSubmit: ({ name, link }) => {
    api.postCard(name, link)
      .then((res) => {
        popupAddCard.close();
        addCard(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAddCard.toggleDefaultButtonText();
      })
  },
  textSubmitButton: 'Сохранение...'
});

popupAddCard.setEventListeners();

popupProfileAddButton.addEventListener('click', () => {
  formAddElement.reset();
  formImageValidation.toggleButttonState();
  formImageValidation.resetErrors();
  popupAddCard.open();
});

const popupWithConfirmation = new PopupWithConfirmation({
  popupSelector: '.popup_type_delete',
  handleConfirmation: (card) => {
    api.deleteCard(card._id)
    .then(() => {
      popupWithConfirmation.close();
      card.removeElement();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithConfirmation.toggleDefaultButtonText();
    })
  },
  textConfirmButton: 'Удаление...'
});

popupWithConfirmation.setEventListeners();

const formProfileValidation = new FormValidator(VALIDATION_CONFIG, formEditElement);
formProfileValidation.enableValidation();

const formImageValidation = new FormValidator(VALIDATION_CONFIG, formAddElement);
formImageValidation.enableValidation();

const formAvatarValidation = new FormValidator(VALIDATION_CONFIG, formEditAvatar);
formAvatarValidation.enableValidation();
