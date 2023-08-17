export default class Section {
  constructor({ items, renderer }, selector){
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  // публичный метод, который отвечает за отрисовку всех элементов. Отрисовка каждого отдельного элемента должна осуществляться функцией renderer.
  renderItems() {
    this._items.forEach(item => this._renderer(item));
  }

  // публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.
  addItem(element) {
    this._container.prepend(element);
  }
}
