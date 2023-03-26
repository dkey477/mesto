export default class UserInfo {
  constructor({profileTitleSelector, profileSubtitleSelector}) {
    this._profileName = document.querySelector(profileTitleSelector);
    this._profileAbout = document.querySelector(profileSubtitleSelector);
  }
// сбор информации из профиля
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._profileAbout.textContent
    };
  }
// Вставка информции из формы в профиль
  setUserInfo({name, job}) {
    this._profileName.textContent = name;
    this._profileAbout.textContent = job;
  }
}
