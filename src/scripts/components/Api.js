export default class Api {
    constructor(url) {
        this._url = url
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(res.status);
        }
        return res.json();
    }

    getProductsList() {
        return fetch(`${this._url}/products`)
            .then(res => {
                return this._getResponseData(res)
            })
    }

    getAllCategories() {
        return fetch(`${this._url}/products/categories`)
            .then(res => {
                return this._getResponseData(res)
            })
    }

    getProductsCategory(category) {
        return fetch(`${this._url}/products/category/${category}`)
        .then(res => {
            return this._getResponseData(res)
        })
    }
}