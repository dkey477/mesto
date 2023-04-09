import "./index.css";
import { formValidation } from "../components/costants.js"
import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js"
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

// Поиск попапа профиля
const popupElementProfile = document.querySelector(".popup_type_profile");
const popupFormElementProfile =
  popupElementProfile.querySelector(".popup__content");

// поиск попапа добавления карточки
const popupElementAddcard = document.querySelector(".popup_type_addcards");
const popupFormElementAddcard =
  popupElementAddcard.querySelector(".popup__content");

  // поиск попапа аватара
const popupElementAvatar = document.querySelector(".popup_type_avatar");
const popupFormElementAvatar =
  popupElementAvatar.querySelector(".popup__content");

//Поиск блока профиля, кнопки открытия попапа, имя профиля, сфера деятельности профиля
const profileElement = document.querySelector(".profile");
const popupOpenButtonElementProfile = profileElement.querySelector(
  ".profile__popup-open"
);
const popupOpenButtonElementAddcard = profileElement.querySelector(
  ".profile__rectangle"
);
const popupOpenButtonElementAvatar = profileElement.querySelector(
  "profile__button-image"
);

let userCurrentId;
// Экземпляр запроса с сервера

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-62",
  headers: {
    authorization: "af746901-9dd5-4dee-a407-b6d45fde601d",
    'Content-Type': 'application/json'
  }
});


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
const createCard = (data, user) => {
  const card = new Card({
    data: data,
    userId: user,
    templateSelector: "#element-card",
    handleOpenCardImg: (card) => {
      popupBigImg.open(card)
    }
  })
  //   data, userId, "#element-card", () =>{
  //   popupBigImg.open(data)
  // });
  return card.createCardImg();
};

// Создание секции
const cards = new Section({
  renderer: (item, userID) => {
    cards.addItem(createCard(item, userID))
  },
  selector: ".elements"
});
// отрисовка карточка
// cards.renderItems(cards, userCurrentId);

Promise.all([api.getInitialCards(), api.getUserInfo()])
.then(([ card, user ]) => {
  userCurrentId = user._id
  userInfo.setUserInfo(user);
  cards.renderItems(card, userCurrentId)
})
// .catch(err => console.log(err));

console.log(api.getInitialCards())

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

// создание  попапа  добавления каточки
const popupAvatar = new PopupWithForm(
  ".popup_type_avatar" ,
  ({ link, name }) => {
    cards.prependItem(createCard({
      name, alt: name,
      link: link,
    }));
  }
);

// // Открытие попапа аватара
// popupOpenButtonElementAvatar.addEventListener("click", () => {
//   popupAvatar.open();
//   validPopupFormElementAvatar.clearValid();
// });

// Валидация попапов
const validPopupFormElementProfile = new FormValidator(formValidation, popupFormElementProfile);
validPopupFormElementProfile.enableValidation();

const validPopupFormElementAddcard = new FormValidator(formValidation, popupFormElementAddcard)
validPopupFormElementAddcard.enableValidation();

// const validPopupFormElementAvatar = new FormValidator(formValidation, popupFormElementAvatar)
// validPopupFormElementAvatar.enableValidation();
