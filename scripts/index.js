// Поиск попапа профиля
const popupElementProfile = document.querySelector(".popup_type_profile");
const popupFormElementProfile =
  popupElementProfile.querySelector(".popup__content");
const popupCloseButtonElementProfile =
  popupElementProfile.querySelector(".popup__close");
const popupName = popupElementProfile.querySelector(".popup__input_type_name");
const popupAbout = popupElementProfile.querySelector(
  ".popup__input_type_about"
);

// поиск попапа добавления карточки
const popupElementAddcard = document.querySelector(".popup_type_addcards");
const popupCloseButtonElementAddcard =
  popupElementAddcard.querySelector(".popup__close");
const popupFormElementAddcard =
  popupElementAddcard.querySelector(".popup__content");

const titleInput = popupElementAddcard.querySelector(".popup__input_type_name");
const titleLink = popupElementAddcard.querySelector(".popup__input_type_about");

// поиск попапа увелечения фото
const popupElementBigImg = document.querySelector(".popup_type_image");
const popupCloseButtonElementBigImg =
  popupElementBigImg.querySelector(".popup__close");
const popupCardText = popupElementBigImg.querySelector(".popup__title");
const popupCardImage = popupElementBigImg.querySelector(".popup__image");
// для открытия попапа увелечения фото используется const cardImage

//Поиск блока профиля, кнопки открытия попапа, имя профиля, сфера деятельности профиля
const profileElement = document.querySelector(".profile");
const popupOpenButtonElementProfile = profileElement.querySelector(
  ".profile__popup-open"
);
const popupOpenButtonElementAddcard = profileElement.querySelector(
  ".profile__rectangle"
);
const profileTitle = profileElement.querySelector(".profile__title");
const profileSubtitle = profileElement.querySelector(".profile__subtitle");

// Включение выключение попапа
const openPopup = (popup) => {
  popup.classList.add("popup_open");
  document.addEventListener("keydown", closePopupEsc);
};

const closePopup = (popup) => {
  popup.classList.remove("popup_open");
  document.removeEventListener("keydown", closePopupEsc);
};
// Закрытие попапа по Esc
const closePopupEsc = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_open");
    closePopup(openedPopup);
  }
};
// Работа кнопки включения попапа Профиля, с переносом текста профиля
popupOpenButtonElementProfile.addEventListener("click", () => {
  popupName.value = profileTitle.textContent;
  popupAbout.value = profileSubtitle.textContent;
  openPopup(popupElementProfile);
});
// Работа кнопки выкл попапа Профиля
popupCloseButtonElementProfile.addEventListener("click", () => {
  closePopup(popupElementProfile);
});
// Перенос текста из шапки Профиля в попап
function insertText(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupName.value;
  profileSubtitle.textContent = popupAbout.value;
  closePopup(popupElementProfile);
}
// Сохранение текста из попапа в шапку Профиля
popupFormElementProfile.addEventListener("submit", insertText);

// Работа кнопки включения попапа Добавления карточки
popupOpenButtonElementAddcard.addEventListener("click", () => {
  openPopup(popupElementAddcard);
});
// Работа кнопки выкл попапа Добавления карточки
popupCloseButtonElementAddcard.addEventListener("click", () => {
  closePopup(popupElementAddcard);
  popupFormElementAddcard.reset;
});

// Добавлени каточек из масива, примение темплейн
const cardTemplate = document.querySelector("#element-card").content;
const cardsContainer = document.querySelector(".elements");

const createCard = (name, link) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".element__image");
  const cardText = cardElement.querySelector(".element__text");
  const cardLike = cardElement.querySelector(".element__icon");
  const deleteBtn = cardElement.querySelector(".element__basket");

  cardText.textContent = name;
  cardImage.src = link;

  // Добавление лайков
  cardLike.addEventListener("click", (evt) => {
    evt.target.classList.toggle("element__icon_active_on");
  });
  // Удаление карточек
  deleteBtn.addEventListener("click", (evt) => {
    const deleteCard = evt.target.closest(".element");
    deleteCard.remove();
  });

  // Работа кнопки включения попапа увелечения фото
  cardImage.addEventListener("click", () => {
    openPopup(popupElementBigImg);

    popupCardText.textContent = name;
    popupCardImage.src = link;
    popupCardImage.alt = name;
  });

  return cardElement;
};

initialCards.forEach((element) => {
  cardsContainer.append(createCard(element.name, element.link));
});

// Работа кнопки выкл попапа увелечения фото
popupCloseButtonElementBigImg.addEventListener("click", () => {
  closePopup(popupElementBigImg);
});

// Функция добавления карточек
const addNewcard = (evt) => {
  evt.preventDefault();
  cardsContainer.prepend(createCard(titleInput.value, titleLink.value));
  closePopup(popupElementAddcard);
  popupContElementAddcard.reset();
};
// Функция закрытия попапов по офверлэю
const closePopupOverlay = (evt) => {
  const openedPopup = document.querySelector(".popup_open");
  if (evt.target === openedPopup) {
    closePopup(openedPopup);
  }
};

document.addEventListener("mousedown", closePopupOverlay);

popupFormElementAddcard.addEventListener("submit", addNewcard);
