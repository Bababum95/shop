import Product from './Product.js'
export default class ProductCategories extends Product {

    _setEventListeners() {
        this.__element.addEventListener('click', () => {
            this._functions.showCategory(this.__element)
        })
    }

    generateProductCategories() {
        this.__element = this._getTemplate();
        this.__element.textContent = this._data;
        this._setEventListeners()
        return this.__element;
    }
}
