import "./index.css";
import { initialCards, formValidation } from "../components/costants.js"
import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js"
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

// Поиск попапа профиля
const popupElementProfile = document.querySelector(".popup_type_profile");
const popupFormElementProfile =
  popupElementProfile.querySelector(".popup__content");

// поиск попапа добавления карточки
const popupElementAddcard = document.querySelector(".popup_type_addcards");
const popupFormElementAddcard =
  popupElementAddcard.querySelector(".popup__content");

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
    profileTitleSelector: ".profile__title",
    profileSubtitleSelector: ".profile__subtitle"
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
      name, alt: name,
      link: link,
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
