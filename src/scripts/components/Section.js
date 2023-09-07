export default class Section {
  constructor(renderer, selector){
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems(items) {
    for (let i = items.length-1; i >= 0; i--) {
      this._renderer(items[i]);
    }
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
