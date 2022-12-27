
const popupElement = document.querySelector('.popup');
const popupContElement = popupElement.querySelector('.popup__content');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__popup-open');
const popupSaveButtonElement = popupElement.querySelector('.popup__save');
//Перенос текста из Профиля в попап
const profileElement = document.querySelector('.profile');
let profileTitle = profileElement.querySelector('.profile__title');
let profileSubtitle = profileElement.querySelector('.profile__subtitle');
let popupName = popupElement.querySelector('.popup__name');
let popupAbout = popupElement.querySelector('.popup__about');


// Включение выключение попапа
const openPopup = function() {
  popupElement.classList.add('popup__open');
  popupName.value = profileTitle.textContent;
  popupAbout.value = profileSubtitle.textContent;
}
const closePopup = function() {
  popupElement.classList.remove ('popup__open');
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);

function insertText (evt) {
  evt.preventDefault()
  profileTitle.textContent = popupName.value;
  profileSubtitle.textContent = popupAbout.value
}

popupContElement.addEventListener('submit', insertText);
popupSaveButtonElement.addEventListener('click', closePopup);
