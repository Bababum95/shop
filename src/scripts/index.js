import '../styles/index.css';

import Menu from './components/Menu.js';
import ProductCard from './components/ProductCard.js'
import ProductCart from './components/ProductCart.js'
import ProductCategories from './components/ProductCategories.js'
import Section from './components/Section.js'
import Api from './components/Api.js'
import PopupProduct from './components/PopupProduct.js'
import Popup from './components/Popup.js'

const cartListItems = []
const allCategories = document.querySelector('.category-all')
const spinner = document.querySelector('.spinner')
const nodeMenuItems = document.querySelectorAll('.menu__item')
const cart = document.querySelector('.header__cart')
const api = new Api('https://fakestoreapi.com');

const rendererProducts = (item) => {
    const card = new ProductCard(
        item,
        {
            templateSelector: '.product',
            elementSelector: '.product__card',
            imageSelector: '.product__image',
            titleSelector: '.product__name',
            priceSelector: '.product__price'
        },
        { openPopup, addToCart });
    const cardElement = card.generateProductCard();
    productsList.addItem(cardElement);
}

const rendererCategories = (item) => {
    const category = new ProductCategories(
        item,
        {
            templateSelector: '.category__template',
            elementSelector: '.category',
        },
        { showCategory })
    const categoryElement = category.generateProductCategories();
    categoriesList.addItem(categoryElement);

}

const rendererCartItems = (item) => {
    const cardForCart = new ProductCart(
        item,
        {
            templateSelector: '.cart-product__teamplate',
            elementSelector: '.cart-product',
            imageSelector: '.cart-product__image',
            titleSelector: '.cart-product__name',
            priceSelector: '.cart-product__price'
        },
        { deleteCard });
    const cardElement = cardForCart.generateProductCard();
    cartList.addItem(cardElement);
}

const choiceCategory = (category) => {
    document.querySelectorAll('.category').forEach((category) => category.classList.remove('choice'))
    category.classList.add('choice')
}

const openPopup = (data) => {
    popup.open(data)
}

const addToCart = (data) => {
    cartListItems.push(data)
    cart.dataset.cart = cartListItems.length
}

const deleteCard = (data) => {
    cartListItems.splice(cartListItems.indexOf( data ), 1)
    cartList.cleanContainer()
    countTotal()
    cartList.renderItems(cartListItems)
    cart.dataset.cart = cartListItems.length === 0 ? '': cartListItems.length
}

const countTotal = () => {
    let total = 0
    cartListItems.forEach((product) => {
        total = total + product.price
    })
    document.querySelector('.popup-cart__title').textContent = `Your cart (${cartListItems.length})`
    document.querySelector('.popup-cart__subtotal_cost').textContent = total
}

function showLoader(show) {
    show? spinner.classList.remove('hide'): spinner.classList.add('hide')
}

const productsList = new Section(rendererProducts, '.container');
const categoriesList = new Section(rendererCategories, '.category__list');
const cartList = new Section(rendererCartItems, '.popup-cart__products-list');
const popup = new PopupProduct('.popup', {addToCart});
const popupCart = new Popup('.popup-cart');

function showAllCategories() {
    productsList.cleanContainer()
    showLoader(true)
    api.getProductsList()
        .then(data => {
            choiceCategory(allCategories)
            productsList.renderItems(data)
        })
        .finally(() => {
            showLoader(false)
          })
}

api.getAllCategories()
    .then(data => {
        categoriesList.renderItems(data)
    })

const showCategory = (category) => {
    productsList.cleanContainer()
    showLoader(true)
    api.getProductsCategory(category.textContent)
        .then(data => {
            choiceCategory(category)
            productsList.renderItems(data)
        })
        .finally(() => {
            showLoader(false)
          })
}

nodeMenuItems.forEach((item) => {
    const menuItem = new Menu(item)
    menuItem.setEventListeners()
})

showAllCategories()
allCategories.addEventListener('click', showAllCategories)
cart.addEventListener('click', () => {
    cartList.cleanContainer()
    countTotal()
    cartList.renderItems(cartListItems)
    popupCart.open()
})