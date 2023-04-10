import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(selectorPopup, {handleFormSubmit}) {
    super(selectorPopup);
    this._handleFormSubmit = handleFormSubmit;
    this._buttonSave = this._popupElement.querySelector(".popup__save");
  }
// Переопределенный слушатель
  setEventListeners() {
    super.setEventListeners();
    this._buttonSave.addEventListener("click", () => {
      this._handleFormSubmit(this)
    })
  }
// Переопределенный метод откртия попапа с подтверждением удаления карточки
  open(card) {
    super.open();
    this.card = card
  }
}

