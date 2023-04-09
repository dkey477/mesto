// Создание и експорт класса Кард
export default class Card {
  constructor({card, userId, templateSelector, handleDeleteBtn, handleOpenCardImg, handleLikeBtn}) {
    this._handleDeleteBtn = handleDeleteBtn
    this._handleLikeBtn = handleLikeBtn
    this.likes = card.likes
    this._userId = userId
    this._name = card.name;
    this.idCard = card._id;
    this._idOwer = card.owner._id;
    this._link = card.link;
    this._alt = card.alt;
    this._templateSelector = templateSelector;
    this._handleOpenCardImg = handleOpenCardImg;
    this._likeQuan = card.likes.length;

  }
  // Получаем шаблон
  _getTamplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  isLike(likes) {
    return likes.some((like) => {
      return like._id === this._userId
    })
  }

  // Метод создания карточки
  createCardImg() {
    this._element = this._getTamplate();
    this._cardImage = this._element.querySelector(".element__image");
    this._cardText = this._element.querySelector(".element__text");
    this._cardLike = this._element.querySelector(".element__icon");
    this._deleteBtn = this._element.querySelector(".element__basket");
    this._contenerLike = this._element.querySelector(".element__icon-check");
    this._quantityLike = this._element.querySelector(".element__icon-quantity")

    this._cardText.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardText.alt = this._alt;
    this._quantityLike.textContent = this._likeQuan;

    if (this._idOwer !==  this._userId) {
      this._deleteBtn.remove();
    }

    if (this.isLike(this.likes)) {
      this._cardLike.classList.add(".element__icon_active_on");
    }

    this._setEventListeners();

    return this._element;
  }



  // Клик по лайк
  handleLikes({ likes }) {
    this._cardLike.classList.toggle("element__icon_active_on");
    this._quantityLike.textContent = likes.length;
    this.likes = likes;
  }

  // Клик по корзне
  deleteCard() {
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
