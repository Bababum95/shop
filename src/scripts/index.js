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
        { openPopup, adToCart });
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
        {  });
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

const adToCart = (data) => {
    cartListItems.push(data)
    cart.dataset.cart = cartListItems.length
}

const productsList = new Section(rendererProducts, '.container');
const categoriesList = new Section(rendererCategories, '.category__list');
const cartList = new Section(rendererCartItems, '.popup-cart__products-list');
const popup = new PopupProduct('.popup');
const popupCart = new Popup('.popup-cart');

function showAllCategories() {
    api.getProductsList()
        .then(data => {
            productsList.cleanContainer()
            choiceCategory(allCategories)
            productsList.renderItems(data)
        })
}

api.getAllCategories()
    .then(data => {
        categoriesList.renderItems(data)
    })

const showCategory = (category) => {
    api.getProductsCategory(category.textContent)
        .then(data => {
            productsList.cleanContainer()
            choiceCategory(category)
            productsList.renderItems(data)
        })
}

nodeMenuItems.forEach((item) => {
    const menuItem = new Menu(item)
    menuItem.setEventListeners()
})

showAllCategories()
allCategories.addEventListener('click', showAllCategories)
cart.addEventListener('click', () => {
    console.log(cartListItems)
    cartList.cleanContainer()
    cartList.renderItems(cartListItems)
    popupCart.open()
})
