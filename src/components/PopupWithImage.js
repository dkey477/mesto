import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._image = this._popupElement.querySelector(".popup__image");
    this._title = this._popupElement.querySelector(".popup__title");
  }
// Открытие попапа со вставкой данных
  open({name, link}) {
    super.open();
    this._image.src = link;
    this._image.alt = name
    this._title.textContent = name;
  }
}
