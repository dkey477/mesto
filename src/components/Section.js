export default class Section {
  constructor({items, renderer}, selector) {
    this._renderItem = items;
    this._renderer = renderer;
    this._contener = document.querySelector(selector);
}

// Добавление контента
renderItems() {
  this._renderItem.forEach(item => {
    this._renderer(item);
});
};

// Появление контента
addItem(element) {
  this._contener.append(element);
}

prependItem(element) {
  this._contener.prepend(element);
}
}
