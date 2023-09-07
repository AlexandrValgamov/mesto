export default class Card {
  constructor(data, myId, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick){
    this._name = data.name;
    this._link = data.link;
    this._likesCount = data.likes.length,
    this._myId = myId;
    this._isMyCard = myId === data.owner._id,
    this._id = data._id;
    this._likes = data.likes;

    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
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

    this._likeElement = this._element.querySelector('.cards__like-button');
    this._trashElement = this._element.querySelector('.cards__trash-button');
    this._imageElement = this._element.querySelector('.cards__image');
    this._likeCounterElement = this._element.querySelector('.cards__like-counter');
    this._element.querySelector('.cards__title').textContent = this._name;
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;

    this.setLikesCount(this._likes);
    if (this.checkStateOfLike()) this.toggleLikeButtonState();
    if (!this._isMyCard) {
      this._trashElement.classList.add('cards__trash-button_disable')
      this._trashElement.disabled = true;
    }
    this._setEventListeners();

    return this._element;
  }

  setLikesCount(likes) {
    this._likeCounterElement.textContent = likes.length;
    this._likes = likes;
  }

  _handleImageClick() {
    this._handleCardClick(this._name, this._link);
  }

  checkStateOfLike() {
    return this._likes.some((item) => {
      return item._id === this._myId;
    });
  }

  toggleLikeButtonState() {
    this._likeElement.classList.toggle('cards__like-button_active');
  }

  removeElement() {
    this._element.remove();
  }

  _setEventListeners() {
    this._imageElement.addEventListener('click', () => {
      this._handleImageClick();
    });

    this._likeElement.addEventListener('click', () => {
      this._handleLikeClick(this);
    });

    this._trashElement.addEventListener('click', () => {
      this._handleDeleteClick(this);
    });
  }
}
