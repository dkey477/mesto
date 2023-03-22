export default class Popup {
  constructor(selectorPopup) {
    this._popupElement = document.querySelector(selectorPopup);
    this._buttonClose = this._popupElement.querySelector(".popup__close");
  }

  open() {
    this._popupElement.classList.add("popup_open");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("popup_open");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
    this.close(this._popupElement);
  }
}

  _handOverlayClose(evt) {
    if (evt.target.classList.contains("popup_open")) {
      this.close(evt.target);
    }
  }

  setEventListeners() {
    this._buttonClose.addEventListener("click", () => {
      this.close(this._popupElement);
    });

    this._popupElement.addEventListener("mousedown", this._handOverlayClose(this.close))
  }
}
