export default class Card {
  constructor(data, templateSelector, handleCardClick){
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.cards__card')
    .cloneNode(true);

    return cardElement;
  }

  createCard(){
    this._element = this._getTemplate();

    this._likeElement = this._element.querySelector('.cards__like');
    this._trashElement = this._element.querySelector('.cards__trash-button');
    this._imageElement = this._element.querySelector('.cards__image');

    this._element.querySelector('.cards__title').textContent = this._name;
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;

    this._setEventListeners();

    return this._element;
  }

  _handleImageClick() {
    this._handleCardClick(this._name, this._link);
  }

  _handleLikeClick() {
    this._likeElement.classList.toggle('cards__like_active');
  }

  _handleTrashClick() {
    this._element.remove();

    this._likeElement = null;
    this._trashElement = null;
    this._imageElement = null;

    this._element = null;
  }

  _setEventListeners() {
    this._imageElement.addEventListener('click', () => {
      this._handleImageClick();
    });

    this._likeElement.addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._trashElement.addEventListener('click', () => {
      this._handleTrashClick();
    });
  }
}
