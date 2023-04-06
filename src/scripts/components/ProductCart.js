import Product from './Product.js'
export default class ProductCart extends Product {
    _setEventListeners() {
        this._card.querySelector('.cart-product__delete').addEventListener('click', () => {
            this._functions.deleteCard(this._data)
        })
    }

    // generateProductCard() {
    //     this._card = super.generateProductCard()
    //     this._setEventListeners()
    //     return this._card;
    // };
}