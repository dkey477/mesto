export default class UserInfo {
  constructor({profileTitleSelector, profileSubtitleSelector, profileImageSelector}) {
    this._profileName = document.querySelector(profileTitleSelector);
    this._profileAbout = document.querySelector(profileSubtitleSelector);
    this._profileImage = document.querySelector(profileImageSelector);
  }
// сбор информации из профиля
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._profileAbout.textContent,
      avatar: this._profileImage.src
    };
  }
// Вставка информции из формы в профиль
  setUserInfo({name, about, avatar}) {
    this._profileName.textContent = name;
    this._profileAbout.textContent = about;
    this._profileImage.src = avatar
  }
}


