export default class PopupProduct {
    constructor(selector) {
        this._popup = document.querySelector(selector)
        this._setEventListeners()
    };

    _setEventListeners() {
        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('opened') || evt.target.classList.contains('close')) {
                this.close();
            };
        });
    }

    close() {
        document.querySelector('.body').classList.remove('lock')
        this._popup.classList.remove('opened');
        document.removeEventListener('keydown', this._handleEscape);
    };
    
    open() {
        document.querySelector('.body').classList.add('lock')
        this._popup.classList.add('opened');
        document.addEventListener('keydown', this._handleEscape);
    };
    
    _handleEscape = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
        };
    };
};