'use strict';

import { showErrorMsg, showInfoMsg } from './helpers';
import { toggleModal } from './modal';
import { getDataFromLS, setDataToLS } from './storage';

// Функції, які передаються колбеками в addEventListners

import {
  getProductsList,
  getNextProductsByCategory,
  getNextProductById,
  showLoader,
  hideLoadMoreButton,
  resetNumeration,
  getNextProductsByQuery,
  clearProductList,
  updateCartData,
} from './products-api';

import { refs } from './refs';

import { STORAGE_KEYS } from './constants';

let selectedCategory;
let query;
export let currentProductid;
export let currentProductPrice;
let currentListItem;

export function catListOnClick(event) {
  if (!event.target.classList.contains('categories__btn')) {
    return;
  }

  if (selectedCategory) {
    selectedCategory.classList.remove('categories__btn--active');
  }

  selectedCategory = event.target;
  selectedCategory.classList.add('categories__btn--active');

  resetNumeration();
  showLoader();
  if (selectedCategory.textContent.toLowerCase() === 'all') {
    getProductsList();
  } else {
    getNextProductsByCategory(selectedCategory.textContent);
  }
}

export function loadMoreBtnOnClick(event) {
  hideLoadMoreButton();
  showLoader();

  if (!query) {
    if (
      !selectedCategory ||
      selectedCategory.textContent.toLowerCase() === 'all'
    ) {
      getProductsList(true);
    } else {
      getNextProductsByCategory(selectedCategory.textContent, true);
    }
  } else {
    getNextProductsByQuery(query, true);
  }
}

export function prodListOnClick(event) {
  if (!event.target.parentElement.classList.contains('products__item')) {
    return;
  }
  currentListItem = event.target.parentElement;
  currentProductid = currentListItem.dataset.id.trim();
  currentProductPrice = +currentListItem.dataset.price.trim();
  getNextProductById(currentProductid);

  const cartArray = getDataFromLS(STORAGE_KEYS.cart, []);
  const wlArray = getDataFromLS(STORAGE_KEYS.wishlist, []);

  updateTextAddToCartBtn(cartArray);
  updateTextaddToWishListBtn(wlArray);

  const cartProduct = cartArray.find(({ id }) => id === currentProductid);
  if (cartProduct) {
    refs.productQuantity.value = cartProduct.quantity;
  } else {
    refs.productQuantity.value = 0;
  }

  toggleModal();
}

function updateTextAddToCartBtn(cartArray) {
  refs.addToCartBtn.textContent = cartArray.some(
    ({ id }) => id === currentProductid
  )
    ? 'Remove from '
    : 'Add to ' + 'cart';
}

function updateTextaddToWishListBtn(wlArray) {
  refs.addToWishListBtn.textContent = wlArray.some(
    id => id === currentProductid
  )
    ? 'Remove from '
    : 'Add to ' + 'wishlist';
}

export function searchFormOnSubmit(event) {
  event.preventDefault();

  const query = event.currentTarget.elements.searchValue.value.trim();

  clearProductList();
  showLoader();

  if (!query) {
    showErrorMsg('Please, fill query value!');

    hideLoader();
    hideLoadMoreButton();
    return;
  }

  hideLoadMoreButton();
  showLoader();
  resetNumeration();

  getNextProductsByQuery(query);
}

export function clearSearchBtnOnClick(event) {
  refs.searchForm.elements.searchValue.value = '';
  getProductsList();
}

function newProductObj(id, quantity = 1, price = 0) {
  return { id, quantity, price };
}

function writeNewQuantityToCartArray(newQuantity) {
  let cartArray = getDataFromLS(STORAGE_KEYS.cart, []);
  const cartProduct = cartArray.find(({ id }) => id === currentProductid);
  if (!cartProduct) {
    cartArray.push(newProductObj(currentProductid, 1, currentProductPrice));
  } else {
    cartProduct.quantity = parseInt(newQuantity);
  }
  setDataToLS(STORAGE_KEYS.cart, cartArray);

  return cartArray;
}

export function increaseQuantity() {
  const newQuantity = parseInt(refs.productQuantity.value) + 1;
  refs.productQuantity.value = newQuantity;

  const cartArray = writeNewQuantityToCartArray(newQuantity);
  updateStatusesOfLists();
  updateTextAddToCartBtn(cartArray);
  if (window.location.pathname.includes('cart')) {
    updateCartData(cartArray);
  }
}

export function decreaseQuantity() {
  if (parseInt(refs.productQuantity.value) > 1) {
    const newQuantity = parseInt(refs.productQuantity.value) - 1;
    refs.productQuantity.value = newQuantity;
    const cartArray = writeNewQuantityToCartArray(newQuantity);
    updateStatusesOfLists();
    updateTextAddToCartBtn(cartArray);
    if (window.location.pathname.includes('cart')) {
      updateCartData(cartArray);
    }
  }
}

export function addToCartBtnOnClick(event) {
  let cartArray = getDataFromLS(STORAGE_KEYS.cart, []);
  let newQuantity = 0;

  const cartProduct = cartArray.find(({ id }) => id === currentProductid);
  if (!cartProduct) {
    cartArray.push(newProductObj(currentProductid, 1, currentProductPrice));
    refs.addToCartBtn.textContent = 'Remove from cart';
    newQuantity = 1;

    if (window.location.pathname.includes('cart')) {
      if (![...refs.prodList.children].includes(currentListItem)) {
        refs.prodList.append(currentListItem);
      }
    }
  } else {
    cartArray = cartArray.filter(({ id }) => id !== currentProductid);
    refs.addToCartBtn.textContent = 'Add to cart';

    if (window.location.pathname.includes('cart')) {
      currentListItem.remove();
    }
  }

  if (window.location.pathname.includes('cart')) {
    updateCartData(cartArray);
  }

  refs.productQuantity.value = newQuantity;

  refs.spanNavCart.textContent = cartArray.reduce(
    (sum, { quantity }) => sum + quantity,
    0
  );
  setDataToLS(STORAGE_KEYS.cart, cartArray);
}

export function addToWishListBtnOnClick(event) {
  let wlArray = getDataFromLS(STORAGE_KEYS.wishlist, []);

  if (!wlArray.includes(currentProductid)) {
    wlArray.push(currentProductid);
    refs.addToWishListBtn.textContent = 'Remove from wishlist';

    // console.log(window.location.pathname);

    if (window.location.pathname.includes('wishlist')) {
      if (![...refs.prodList.children].includes(currentListItem)) {
        refs.prodList.append(currentListItem);
      }
    }
  } else {
    wlArray = wlArray.filter(id => id !== currentProductid);
    refs.addToWishListBtn.textContent = 'Add to wishlist';

    if (window.location.pathname.includes('wishlist')) {
      currentListItem.remove();
    }
  }
  refs.spanNavWishList.textContent = wlArray.length;
  setDataToLS(STORAGE_KEYS.wishlist, wlArray);
}

export function updateStatusesOfLists() {
  const cartArray = getDataFromLS(STORAGE_KEYS.cart, []);
  refs.spanNavCart.textContent = cartArray.reduce(
    (sum, { quantity }) => sum + quantity,
    0
  );
  const wlArray = getDataFromLS(STORAGE_KEYS.wishlist, []);
  refs.spanNavWishList.textContent = wlArray.length;
}

export function cartBuyBtnOnClick(event) {
  showInfoMsg('Products purchased successfully!');
  setDataToLS(STORAGE_KEYS.cart, []);
  updateStatusesOfLists();

  setTimeout(() => {
    window.location.href = '/'; //go to main page
  }, 2000);
}

export function changeThemeBtnOnClick() {
  toggleTheme();
}

export function toggleTheme() {
  let currentTheme = '';
  if (refs.body.classList.contains('theme-light')) {
    currentTheme = 'theme-dark';
  } else {
    currentTheme = 'theme-light';
  }
  setDataToLS(STORAGE_KEYS.theme, currentTheme);

  refs.body.classList.replace(oppositeTheme(currentTheme), currentTheme);
  return currentTheme;
}

function oppositeTheme(theme) {
  return theme === 'theme-dark' ? 'theme-light' : 'theme-dark';
}

export function setTheme(theme) {
  if (!refs.body.classList.contains(theme)) {
    refs.body.classList.add(theme);
  }
  refs.body.classList.remove(oppositeTheme(theme));
}

export function loadSavedTheme() {
  let savedTheme = getDataFromLS(STORAGE_KEYS.theme);
  if (savedTheme === '') {
    savedTheme = 'theme-dark';
  }
  setTheme(savedTheme);
}
