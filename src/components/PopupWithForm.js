import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, handleFormSubmit) {
    super(selectorPopup);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".popup__content");
    this._inputList = this._popupElement.querySelectorAll(".popup__input");
  }
// Сбор данных с инпутов
  _getInputValues() {
    this._formValues = {}

    this._inputList.forEach((input) => {
      const inputName = input.getAttribute("name");
      this._formValues[inputName] = input.value;
    });
    return this._formValues
  }
// Заполниние  инпутов формы переданными данными по ключу name инпута
  setInputValues(data) {
    this._inputList.forEach((input) => {
     const inputName = input.getAttribute("name");
     input.value = data[inputName];
    });
  }
// Установка слушателя
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    })
  }
// Закрытие попапа со сбросом формы
  close() {
    super.close()
    this._popupForm.reset();
  }
}


