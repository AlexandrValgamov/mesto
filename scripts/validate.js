const VALIDATION_CONFIG = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disable',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
}

function checkInputValidity(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function disableButton(button, config) {
  button.classList.add(config.inactiveButtonClass);
  button.disabled = true;
}

function enableButton(button, config) {
  button.classList.remove(config.inactiveButtonClass);
  button.disabled = false;
}

function toggleButttonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)){
    disableButton(buttonElement, config);
  } else {
    enableButton(buttonElement, config);
  }
}

function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButttonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButttonState(inputList, buttonElement, config);
    })
  });
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach(element => {
    setEventListeners(element, config);
  });
}

enableValidation(VALIDATION_CONFIG);
