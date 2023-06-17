const editButtonElement = document.querySelector('.profile__edit-button');
const popupElement = document.querySelector('.popup');
const formElement = document.querySelector('.popup__form');
const closeButtonElement = document.querySelector('.popup__close-button');

const titleElement = document.querySelector('.profile__title');
const subtitleElement = document.querySelector('.profile__subtitle');

const inputNameElement = document.querySelector('.popup__input_edit_name');
const inputDescriptionElement = document.querySelector('.popup__input_edit_description');

function editClick() {
  popupElement.classList.add('popup_opened');

  inputNameElement.value = titleElement.textContent;
  inputDescriptionElement.value = subtitleElement.textContent;
}

function closeClick() {
  popupElement.classList.remove('popup_opened');
}

function saveClick(evt) {
  evt.preventDefault();
  titleElement.textContent = inputNameElement.value;
  subtitleElement.textContent = inputDescriptionElement.value;
  closeClick();
}

editButtonElement.addEventListener('click', editClick);
closeButtonElement.addEventListener('click', closeClick);
formElement.addEventListener('submit', saveClick);
