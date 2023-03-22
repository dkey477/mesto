export default class UserInfo {
  constructor({profileTitle, profileSubtitle}) {
    this._profileName = document.querySelector(profileTitle);
    this._profileAbout = document.querySelector(profileSubtitle);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      activity: this._profileAbout.textContent
    };
  }

  setUserInfo({name, activity}) {
    this._profileName.textContent = name;
    this._profileAbout.textContent = activity
  }
}
