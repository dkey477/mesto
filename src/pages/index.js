import "./index.css";
import { formValidation } from "../components/costants.js"
import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js"
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

// Поиск попапа профиля
const popupElementProfile = document.querySelector(".popup_type_profile");
const popupFormElementProfile =
  popupElementProfile.querySelector(".popup__content");

// поиск попапа добавления карточки
const popupElementAddcard = document.querySelector(".popup_type_addcards");
const popupFormElementAddcard =
  popupElementAddcard.querySelector(".popup__content");
  const popupButtonDelete = popupElementAddcard.querySelector(".popup__content");

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
// Кнопка открытия попапа аватара
const popupOpenButtonElementAvatar = profileElement.querySelector(
  ".profile__button-image"
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
    profileSubtitleSelector: ".profile__subtitle",
    profileImageSelector: ".profile__image"
  }
)

// Создание карточки
const createCard = (data, user) => {
  const card = new Card({
    card: data,
    userId: user,
    templateSelector: "#element-card",

    handleDeleteBtn: () => {
      popupDelete.open(card);

    },

    handleOpenCardImg: (card) => {
      popupBigImg.open(card)
    },

    handleLikeBtn: () => {
      api.toggleLike(card.idCard, card.isLike(card.likes))
      .then(res => {
        card.handleLikes(res)

      }).catch(err => console.log(err))
    }
  });
  return card.createCardImg();
};

// Создание секции
const cards = new Section({
  renderer: (item, userID) => {
    cards.addItem(createCard(item, userID))
  },
  selector: ".elements"
});


Promise.all([api.getInitialCards(), api.getUserInfo()])
.then(([ card, user ]) => {
  userCurrentId = user._id
  userInfo.setUserInfo(user);
  cards.renderItems(card, userCurrentId)
})
.catch(err => console.log(err));

// создание  попапа  профиля
const popupProfile = new PopupWithForm(
  ".popup_type_profile" ,
  {
    handleFormSubmit: (data) => {
      popupProfile.expectationText(true, "Сохранение...");

      api.setUserInfo(data)
    .then((res) => {
      userInfo.setUserInfo(res)
      popupProfile.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      popupProfile.expectationText(false);
    })
  }
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

// создание  попапа  добавления карточки
const popupAddcard = new PopupWithForm(
  ".popup_type_addcards" ,
  {
    handleFormSubmit: (data) => {
    popupAddcard.expectationText(true, "Создание...");
    api.addCard(data)
    .then((res) => {
      cards.prependItem(createCard(res, userCurrentId));
      popupAddcard.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      popupAddcard.expectationText(false);
    })
  }
}
);


popupAddcard.setEventListeners();

// Открытие попапа добавления карточки
popupOpenButtonElementAddcard.addEventListener("click", () => {
  popupAddcard.open();
  validPopupFormElementAddcard.clearValid();
});

// создание  попапа  смены аватра
const popupAvatar = new PopupWithForm(
  ".popup_type_avatar" ,
  {
    handleFormSubmit: (data) => {
    popupAvatar.expectationText(true, "Сохранение...");
    api.setAvatar(data)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupAvatar.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      popupAvatar.expectationText(false);
    })
  }
}
);

popupAvatar.setEventListeners();



// Открытие попапа аватара
popupOpenButtonElementAvatar.addEventListener("click", () => {
  popupAvatar.open();
  validPopupFormElementAvatar.clearValid();
});


// создание  попапа  удаления картинки
const popupDelete = new PopupWithConfirmation(
  ".popup_type_delete" , {
    handleFormSubmit: ({card}) => {
      api.removeCard(card.idCard)

      .then(() => {
        card.deleteCard()
        popupDelete.close()
      })
      .catch(err => console.log(err))
    }
  })

  popupDelete.setEventListeners();

// Валидация попапов
const validPopupFormElementProfile = new FormValidator(formValidation, popupFormElementProfile);
validPopupFormElementProfile.enableValidation();

const validPopupFormElementAddcard = new FormValidator(formValidation, popupFormElementAddcard)
validPopupFormElementAddcard.enableValidation();

const validPopupFormElementAvatar = new FormValidator(formValidation, popupFormElementAvatar)
validPopupFormElementAvatar.enableValidation();


