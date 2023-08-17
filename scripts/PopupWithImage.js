import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = document.querySelector('.popup__image');
    this._caption = document.querySelector('.popup__caption');
  }
  // Этот класс должен перезаписывать родительский метод open. В методе open класса
  // PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.
  open(name, link) {
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;

    super.open();
  }
}
