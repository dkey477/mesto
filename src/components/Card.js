// Создание и експорт класса Кард
export default class Card {
  constructor(card, templateSelector, handleOpenCardImg) {
    this._name = card.name;
    this._link = card.link;
    this._alt = card.alt;
    this._templateSelector = templateSelector;
    this._handleOpenCardImg = handleOpenCardImg;
  }
  // Получаем шаблон
  _getTamplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  // Метод создания карточки
  createCardImg() {
    this._element = this._getTamplate();
    this._cardImage = this._element.querySelector(".element__image");
    this._cardText = this._element.querySelector(".element__text");
    this._cardLike = this._element.querySelector(".element__icon");
    this._deleteBtn = this._element.querySelector(".element__basket");

    this._cardText.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardText.alt = this._alt;

    this._setEventListeners();

    return this._element;
  }
  // Клик по лайк
  _handleLikeBtn() {
    this._cardLike.classList.toggle("element__icon_active_on");
  }
  // Клик по корзне
  _handleDeleteBtn() {
    this._element.remove();
    this._element = null;
  }
  // Клик по картинке
  _handleOpenCard() {
    this._handleOpenCardImg({
      name: this._name,
      link: this._link,
      alt: this._alt
    });
  }
  // Добавляем Слушатели
  _setEventListeners() {
    this._cardLike.addEventListener("click", () => {
      this._handleLikeBtn();
    });

    this._deleteBtn.addEventListener("click", () => {
      this._handleDeleteBtn();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleOpenCard();
    });
  }
}
