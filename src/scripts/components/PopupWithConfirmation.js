import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, handleConfirmation, textConfirmButton }) {
    super(popupSelector);
    this._handleConfirmation = handleConfirmation;
    this._textConfirmButton = textConfirmButton;
    this._confirmButton = this._popup.querySelector('.popup__save-button');
    this._textDefaultSubmitButton = this._confirmButton.textContent;
  }

  open(card) {
    super.open();
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener('click', () => {
      this._handleConfirmation(this._card);
      this._toggleButttonText();
    });
  }

  _toggleButttonText() {
    this._confirmButton.textContent = this._textConfirmButton;
  }

  toggleDefaultButtonText() {
    this._confirmButton.textContent = this._textDefaultSubmitButton;
  }
}
