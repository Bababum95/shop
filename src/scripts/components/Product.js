export default class Product {
    constructor(data, selectors, functions) {
        this._templateSelector = selectors.templateSelector
        this._elementSelector = selectors.elementSelector
        this._data = data
        this._selectors = selectors
        this._functions = functions
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector(this._elementSelector)
            .cloneNode(true);
        return cardElement;
    };

    generateProductCard() {
        this._card = this._getTemplate();
        this._productImage = this._card.querySelector(this._selectors.imageSelector);
        this._card.querySelector(this._selectors.titleSelector).textContent = this._data.title;
        this._card.querySelector(this._selectors.priceSelector).textContent = this._data.price;
        this._productImage.src = this._data.image;
        this._productImage.alt = this._data.title;
        return this._card;
    };
}