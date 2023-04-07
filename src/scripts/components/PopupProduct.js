import Popup from './Popup.js'

export default class PopupProduct extends Popup {
    constructor(selector, functions) {
        super(selector)
        this._functions = functions
        this._data = null
    };
    
    _setEventListeners() {
        this._popup.querySelector('.popup__cart').addEventListener('click', () => {
            this._functions.addToCart(this._data)
        })
        super._setEventListeners()
    }

    open(data) {
        this._data = data
        this._popup.querySelector('.popup__title').textContent = this._data.title
        this._popup.querySelector('.popup__price').textContent = this._data.price
        this._popup.querySelector('.popup__description').textContent = this._data.description
        this._popup.querySelector('.popup__image').src = this._data.image
        this._popup.querySelector('.popup__image').alt = this._data.title
        super.open()
    };
};