export default class Menu {
    constructor(element) {
        this._element = element
        this._category = this._element.querySelector('.menu__title')
        this._categoryList = this._element.querySelector('.menu__list')
    }

    setEventListeners() {
        this._category.addEventListener('click', () => {
            this._toggleMenuStage()
        })
    }

    _toggleMenuStage() {
        this._category.classList.toggle('open')
        this._categoryList.classList.toggle('open')
    }
}