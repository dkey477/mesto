export default class Popup {
  constructor(selectorPopup) {
    this._popupElement = document.querySelector(selectorPopup);
    this._buttonClose = this._popupElement.querySelector(".popup__close")
  }
// Открытие попапа с слушаетелем закрытия по Esc
  open() {
    this._popupElement.classList.add("popup_open");
    document.addEventListener("keydown", this._handleEscClose);
  }
// Закрытие попапа с снятием слушаетелем закрытия по Esc
  close() {
    this._popupElement.classList.remove("popup_open");
    document.removeEventListener("keydown", this._handleEscClose);
  }
// Закрытие по Esc
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
    this.close();
  }
}
// Закрытие по оверлэю
  _handOverlayClose(evt) {
    if (evt.target.classList.contains("popup_open")) {
      this.close();
    }
  }
//  Установка слушателей
  setEventListeners() {
    this._buttonClose.addEventListener("click", () => {
      this.close();
    });

    this._popupElement.addEventListener("mousedown", this._handOverlayClose.bind(this))
  }



}
