import Product from './Product.js'
export default class ProductCard extends Product {

    _setEventListeners() {
        this._card.querySelector('.product__show').addEventListener('click', () => {
            this._functions.openPopup(this._data)
        })
        this._card.querySelector('.product__cart').addEventListener('click', () => {
            this._functions.addToCart(this._data)
        })
    }

    generateProductCard() {
        this._card = super.generateProductCard()
        this._setEventListeners()
        return this._card;
    };
}