export default class Section {
  constructor({ renderer, selector }) {
    this._renderer = renderer;
    this._contener = document.querySelector(selector);
}

// Добавление контента
renderItems(items, user) {
  items.forEach(item => {
    this._renderer(item, user);
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
