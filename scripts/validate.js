const formValidation = {
  formSelector: '.popup__content',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error'
};
// Функция валидации
function enableValidation(config) {
const formList = Array.from(document.querySelectorAll(config.formSelector));

formList.forEach((form) => {
  enableFormValidation(form, config);
});
}
// Функция валидации для формы
function enableFormValidation(form, config) {
  form.addEventListener('input', () => {
    toggleButton(form, config);
  });
  addInputListners(form, config);
  toggleButton(form, config);
}
// Функция обработки инпута
function handelFromInput(evt,config) {
  const input = evt.target;
  const inputId = input.id
  const errorElement = document.querySelector(`#${inputId}-error`);

  if (input.validity.valid) {
    input.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
  }
  else {
    input.classList.add(config.inputErrorClass);
    errorElement.textContent = input.validationMessage;
  }
}

// Функция проверка кнопки
function toggleButton(form, config) {
  const buttonSubmitList = Array.from(form.querySelectorAll(config.submitButtonSelector))
  const isFormValid = form.checkValidity()
  buttonSubmitList.forEach((button) => {
    button.disabled = !isFormValid
    button.classList.toggle('popup__save_disabled', !isFormValid)
  })
}
// Функция поинка инпутов
function addInputListners(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  inputList.forEach(function (item) {
    item.addEventListener('input', (evt) => {
      handelFromInput(evt, config)
    });
    })
  };

enableValidation(formValidation);

