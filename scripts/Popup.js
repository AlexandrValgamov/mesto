export default class Popup {
  constructor(popupSelector){
    this._popup = document.querySelector(popupSelector);
    this._button = this._popup.querySelector('.popup__close-button');
  }

  // публичные методы open и close, которые отвечают за открытие и закрытие попапа.
  open() {
    this._popup.classList.add('popup_opened');
    this._handleEscClose = this._handleEscClose.bind(this);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // содержит логику закрытия попапа клавишей Esc.
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
      }
  }

  // добавляет слушатель клика иконке закрытия попапа. Модальное окно также закрывается при клике на затемнённую область вокруг формы.
  setEventListeners() {
    this._button.addEventListener('click', () => this.close());
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.currentTarget === evt.target) {
        this.close();
      }
    });
  }
}
