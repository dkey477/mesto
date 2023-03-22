import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, handleFormSubmit) {
    super(selectorPopup);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".popup__content");
    this._inputList = this._popupElement.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    this._formValues = {}

    this._inputList.forEach((input) => {
      const inputName = input.getAttribute("name");
      this._inputs[inputName] = input.value;
    });
    return this._formValues
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    })
  }

  close() {
    super.close()
    this._popupForm.reset();
  }
}


