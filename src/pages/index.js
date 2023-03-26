import "./index.css";
import { initialCards, formValidation } from "../components/cards.js"
import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js"
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

// Поиск попапа профиля
const popupElements = document.querySelectorAll('.popup')
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
// Экземпляр для попапа карточки
const popupBigImg = new PopupWithImage(".popup_type_image")

//  Слушатель на для попапа каточки
popupBigImg.setEventListeners();

// Класс профиля
const userInfo = new UserInfo(
  {
    profileTitle: ".profile__title",
    profileSubtitle: ".profile__subtitle"
  }
)

// Создание карточки
const createCard = (data) => {
  const card = new Card(data, "#element-card", () =>{
    popupBigImg.open(data)
  });
  return card.createCardImg();
};

// Создание секции
const cards = new Section({
  items: initialCards,
  renderer: (item) => {
    cards.addItem(createCard(item))
  }
}, ".elements");
// отрисовка карточка
cards.renderItems();



// создание  попапа  профиля
const popupProfile = new PopupWithForm(
  ".popup_type_profile" ,
  ({ name, job }) => {
    userInfo.setUserInfo({ name, job });
  }
);

//  Слушатель на для попапа профиля
popupProfile.setEventListeners();

// Открытие попапа профиля
popupOpenButtonElementProfile.addEventListener("click", () => {
  popupProfile.setInputValues(userInfo.getUserInfo());
  popupProfile.open();
  validPopupFormElementProfile.clearValid();
});

// создание  попапа  добавления каточки
const popupAddcard = new PopupWithForm(
  ".popup_type_addcards" ,
  ({ link, name }) => {
    cards.prependItem(createCard({
      name: name,
      link: link,
      alt: name
    }));
  }
);

//  Слушатель на для попапа добаления каточки
popupAddcard.setEventListeners();

// Открытие попапа добавления карточки
popupOpenButtonElementAddcard.addEventListener("click", () => {
  popupAddcard.open();
  validPopupFormElementAddcard.clearValid();
});

// Валидация попапов
const validPopupFormElementProfile = new FormValidator(formValidation, popupFormElementProfile);
validPopupFormElementProfile.enableValidation();

const validPopupFormElementAddcard = new FormValidator(formValidation, popupFormElementAddcard)
validPopupFormElementAddcard.enableValidation();



// const handleOpenCardImg = (cont) => {
//   openPopup(popupElementBigImg);
//   popupCardText.textContent = cont.name;
//   popupCardImage.src = cont.link;
//   popupCardImage.alt = cont.name;
// }



// Включение выключение попапа
// const openPopup = (popup) => {
//   popup.classList.add("popup_open");
//   document.addEventListener("keydown", closePopupEsc);
// };

// const closePopup = (popup) => {
//   popup.classList.remove("popup_open");
//   document.removeEventListener("keydown", closePopupEsc);
// };
// Закрытие попапа по Esc
// const closePopupEsc = (evt) => {
//   if (evt.key === "Escape") {
//     const openedPopup = document.querySelector(".popup_open");
//     closePopup(openedPopup);
//   }
// };


// Работа кнопки включения попапа Профиля, с переносом текста профиля




// // Работа кнопки выкл попапа Профиля
// popupCloseButtonElementProfile.addEventListener("click", () => {
//   closePopup(popupElementProfile);
// });
// Перенос текста из шапки Профиля в попап
// function insertText(evt) {
//   evt.preventDefault();
//   profileTitle.textContent = popupName.value;
//   profileSubtitle.textContent = popupAbout.value;
//   closePopup(popupElementProfile);
// }
// Сохранение текста из попапа в шапку Профиля
// popupFormElementProfile.addEventListener("submit", insertText);

// Работа кнопки включения попапа Добавления карточки

// Работа кнопки выкл попапа Добавления карточки
// popupCloseButtonElementAddcard.addEventListener("click", () => {
//   closePopup(popupElementAddcard);
//   popupFormElementAddcard.reset;
// });

// // Добавлени каточек из масива, примение темплейн
// // const cardTemplate = document.querySelector("#element-card").content;
// const cardsContainer = document.querySelector(".elements");



// // const createCard = (name, link) => {
//   const cardImage = document.querySelector(".element__image");
//   const cardText = document.querySelector(".element__text");
//   const cardLike = document.querySelector(".element__icon");
//   const deleteBtn = document.querySelector(".element__basket");


// // initialCards.forEach((element) => {
//   cardsContainer.append(createCard(element));
// });

// Работа кнопки выкл попапа увелечения фото
// popupCloseButtonElementBigImg.addEventListener("click", () => {
//   closePopup(popupElementBigImg);
// });

// // Функция добавления карточек
// const addNewcard = (evt) => {
//   evt.preventDefault();
//   cardsContainer.prepend(createCard({
//     name: titleInput.value,
//     link: titleLink.value
//   }));
//   // closePopup(popupElementAddcard);
//   // popupFormElementAddcard.reset();
// };
// // Функция закрытия попапов по офверлэю
// // const closePopupOverlay = (evt) => {
// //   if (evt.target.classList.contains("popup_open")) {
// //     closePopup(evt.target);
// //   }
// // };
// // Установка слушателя оверлэй в каждый попап
// // popupElements.forEach((popup) => {
// //   popup.addEventListener("mousedown", closePopupOverlay);
// // })

// popupFormElementAddcard.addEventListener("submit", addNewcard);
