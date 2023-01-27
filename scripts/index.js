// Поиск попапа профиля
const popupElement = document.querySelector('.popup')
const popupElementProfile = document.querySelector('.popup_type_profile');
const popupContElementProfile = popupElementProfile.querySelector('.popup__content');
const popupCloseButtonElementProfile = popupElementProfile.querySelector('.popup__close');
let popupName = popupElementProfile.querySelector('.popup__input_type_name');
let popupAbout = popupElementProfile.querySelector('.popup__input_type_about');

//Поиск блока профиля, кнопки открытия попапа, имя профиля, сфера деятельности профиля
const profileElement = document.querySelector('.profile');
const popupOpenButtonElementProfile = profileElement.querySelector('.profile__popup-open');
let profileTitle = profileElement.querySelector('.profile__title');
let profileSubtitle = profileElement.querySelector('.profile__subtitle');

// Включение выключение попапа, с переносом текста профиля
const togglePopup = (popup) => {
  popup.classList.toggle('popup_open');
  popupName.value = profileTitle.textContent;
  popupAbout.value = profileSubtitle.textContent;
}

// Работа кнопки включения попапа Профиля
popupOpenButtonElementProfile.addEventListener('click',  () => {
  togglePopup(popupElementProfile);
});
// Работа кнопки выкл попапа Профиля
popupCloseButtonElementProfile.addEventListener('click',  () => {
  togglePopup(popupElementProfile);
});
// Перенос текста из шапки Профиля в попап
function insertText (evt) {
  evt.preventDefault()
  profileTitle.textContent = popupName.value;
  profileSubtitle.textContent = popupAbout.value;
  togglePopup(popupElementProfile);
}
// Сохранение текста из попапа в шапку Профиля
popupContElementProfile.addEventListener('submit', insertText);


// поиск попапа добавления карточки
const popupElementAddcard = document.querySelector('.popup_type_addcards');
const popupCloseButtonElementAddcard = popupElementAddcard.querySelector('.popup__close');
const popupContElementAddcard = popupElementAddcard.querySelector('.popup__content');
const popupOpenButtonElementAddcard = profileElement.querySelector('.profile__rectangle');
let titleInput = popupElementAddcard.querySelector('.popup__input_type_name');
let titleLink = popupElementAddcard.querySelector('.popup__input_type_about');


// Работа кнопки включения попапа Добавления карточки
popupOpenButtonElementAddcard.addEventListener('click',  () => {
  togglePopup(popupElementAddcard);
});
// Работа кнопки выкл попапа Добавления карточки
popupCloseButtonElementAddcard.addEventListener('click',  () => {
  togglePopup(popupElementAddcard);
  popupContElementAddcard.reset
});

// Добавлени каточек из масива, примение темплейн

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardTemplate = document.querySelector('#element-card').content
const cardElements = document.querySelector('.elements')

  const createCard = (name, link) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage =  cardElement.querySelector('.element__image');
  const cardText = cardElement.querySelector('.element__text');
  const cardLike = cardElement.querySelector('.element__icon')
  const deleteBtn = cardElement.querySelector('.element__basket');

  cardText.textContent = name;
  cardImage.src = link;
  cardImage.alt = name

  // Добавление лайков
cardLike.addEventListener('click', (evt) => {
evt.target.classList.toggle('element__icon_active_on');
})
// Удаление карточек
deleteBtn.addEventListener('click', (evt) => {
  const deleteCard = evt.target.closest('.element');
  deleteCard.remove()
})

// поиск попапа увелечения фото
const popupElementBigImg = document.querySelector('.popup_type_image');
const popupCloseButtonElementBigImg  = popupElementBigImg.querySelector('.popup__close');
const popupCardText = popupElementBigImg.querySelector('.popup__title')
const popupCardImage = popupElementBigImg.querySelector('.popup__image')

// для открытия попапа увелечения фото используется const cardImage

// Работа кнопки включения попапа увелечения фото
cardImage.addEventListener('click', () => {
  togglePopup(popupElementBigImg);

  popupCardText.textContent = name;
  popupCardImage.src = link;
  popupCardImage.alt = name
});



  return cardElement
}

initialCards.forEach((element) => {
  cardElements.append(createCard(element.name, element.link, element.alt));
})


// Работа кнопки выкл попапа увелечения фото
const popupElementBigImg = document.querySelector('.popup_type_image');
const popupCloseButtonElementBigImg  = popupElementBigImg.querySelector('.popup__close');
popupCloseButtonElementBigImg.addEventListener('click',  () => {
  togglePopup(popupElementBigImg);
});

// Функция добавления карточек
const addNewcard = (evt) => {
evt.preventDefault();
cardElements.prepend(createCard(titleInput.value, titleLink.value));
togglePopup(popupElementAddcard);
popupContElementAddcard.reset();
}

popupContElementAddcard.addEventListener('submit', addNewcard);
