export default class Section {
  constructor({items, renderer}, selector) {
    this._renderItem = items;
    this._renderer = renderer;
    this._contener = document.querySelector(selector);
}

renderItems() {
  this._renderItem.forEach(item => {
    this._renderer(item);
});
};

additem(element) {
  this._contener.append(element);
}
}
