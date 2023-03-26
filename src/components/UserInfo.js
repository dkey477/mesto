export default class UserInfo {
  constructor({profileTitle, profileSubtitle}) {
    this._profileName = document.querySelector(profileTitle);
    this._profileAbout = document.querySelector(profileSubtitle);
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
