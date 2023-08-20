export const initialCards = [
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

export const VALIDATION_CONFIG = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disable',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

export const popupProfileOpenButton = document.querySelector('.profile__edit-button');
export const popupProfileAddButton = document.querySelector('.profile__add-button');
export const popupEditElement = document.querySelector('.popup_type_edit');
export const formEditElement = popupEditElement.querySelector('.popup__form');
export const inputNameElement = popupEditElement.querySelector('.popup__input_edit_name');
export const inputDescriptionElement = popupEditElement.querySelector('.popup__input_edit_description');
export const popupAddElement = document.querySelector('.popup_type_add');
export const formAddElement = popupAddElement.querySelector('.popup__form');
