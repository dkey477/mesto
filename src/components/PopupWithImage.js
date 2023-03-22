import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(selectorPopup, cont) {
    super(selectorPopup);
    this._image = document.querySelector(".popup__image");
    this._title = document.querySelector(".popup__title");
  }

  open({name, link}) {
    this._image.src = link;
    this._image.alt = name
    this._title.textContent = name;
    super.open();
  }
}
