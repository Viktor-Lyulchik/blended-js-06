'use strict';

//Обʼєкт з посиланнями на ДОМ елементи

export const refs = {
  catList: document.querySelector('ul.categories'),
  prodList: document.querySelector('ul.products'),
  divNotFound: document.querySelector('div.not-found'),
  loadMoreBtn: document.querySelector('button.load-more'),
  loader: document.querySelector('.loader'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
  modalProduct: document.querySelector('div.modal-product'),
  searchForm: document.querySelector('form.search-form'),
  clearSearchBtn: document.querySelector('button.search-form__btn-clear'),
  addToCartBtn: document.querySelector('button.modal-product__btn--cart'),
  addToWishListBtn: document.querySelector(
    'button.modal-product__btn--wishlist'
  ),
  spanNavCart: document.querySelector('span[data-cart-count]'),
  spanNavWishList: document.querySelector('span[data-wishlist-count]'),
  spanCartDataCount: document.querySelector('span[data-count]'),
  spanCartDataPrice: document.querySelector('span[data-price]'),
  cartBuyBtn: document.querySelector('button.cart-summary__btn'),
  goToTopOfListBtn: document.querySelector('button.go-to-top-of-list'),
  changeThemeBtn: document.querySelector('button.theme-toggle-button'),
  body: document.querySelector('body'),
  decreaseBtn: document.querySelector('button.decrease-btn'),
  increaseBtn: document.querySelector('button.increase-btn'),
  productQuantity: document.querySelector('input.product-quantity'),
};
