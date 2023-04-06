import Popup from './Popup.js'

export default class PopupProduct extends Popup {
    constructor(selector) {
        super(selector)
        this._setEventListeners()
    };
    
    open(data) {
        this._popup.querySelector('.popup__title').textContent = data.title
        this._popup.querySelector('.popup__price').textContent = data.price
        this._popup.querySelector('.popup__description').textContent = data.description
        this._popup.querySelector('.popup__image').src = data.image
        this._popup.querySelector('.popup__image').alt = data.title
        super.open()
    };
};