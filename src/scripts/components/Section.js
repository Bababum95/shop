export default class Section {
    constructor(renderer, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    };

    renderItems(items) {
        items.forEach(this._renderer)
    };

    cleanContainer() {
        this._container.innerHTML = '';
    }

    addItem(element) {
        this._container.append(element);
    };
}