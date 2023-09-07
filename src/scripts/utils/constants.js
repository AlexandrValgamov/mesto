export const VALIDATION_CONFIG = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disable',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

export const API_CONFIG = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-74',
  headers: {
    authorization: '6a946535-a3ba-4e38-a675-45b993b18249',
    'Content-Type': 'application/json'
  }
};

export const popupProfileOpenButton = document.querySelector('.profile__edit-button');
export const popupProfileAddButton = document.querySelector('.profile__add-button');
export const popupProfileAvatarButton = document.querySelector('.profile__avatar-button');
export const popupEditElement = document.querySelector('.popup_type_edit');
export const formEditElement = popupEditElement.querySelector('.popup__form');
export const inputNameElement = popupEditElement.querySelector('.popup__input_edit_name');
export const inputDescriptionElement = popupEditElement.querySelector('.popup__input_edit_description');
export const popupAddElement = document.querySelector('.popup_type_add');
export const formAddElement = popupAddElement.querySelector('.popup__form');
export const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
export const formEditAvatar = popupEditAvatar.querySelector('.popup__form');
