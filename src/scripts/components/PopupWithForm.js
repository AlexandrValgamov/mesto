import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit, textSubmitButton }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._submitButton = this._form.querySelector('.popup__save-button');
    this._textSubmitButton = textSubmitButton;
    this._textDefaultSubmitButton = this._submitButton.textContent;
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach(input => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._toggleButttonText();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  _toggleButttonText() {
    this._submitButton.textContent = this._textSubmitButton;
  }

  toggleDefaultButtonText() {
    this._submitButton.textContent = this._textDefaultSubmitButton;
  }
}
