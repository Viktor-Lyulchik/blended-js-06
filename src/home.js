'use strict';

//Логіка сторінки Home

import { refs } from './js/refs';

import {
  catListOnClick,
  loadMoreBtnOnClick,
  prodListOnClick,
  searchFormOnSubmit,
  clearSearchBtnOnClick,
  addToCartBtnOnClick,
  addToWishListBtnOnClick,
  updateStatusesOfLists,
  changeThemeBtnOnClick,
  loadSavedTheme,
  increaseQuantity,
  decreaseQuantity,
} from './js/handlers';

import { toggleModal } from './js/modal';

import {
  getCategories,
  getProductsList,
  hideLoader,
  hideLoadMoreButton,
} from './js/products-api';

loadSavedTheme();
hideLoader();
hideLoadMoreButton();

getCategories();
getProductsList();
updateStatusesOfLists();

refs.catList.addEventListener('click', catListOnClick);

refs.closeModalBtn.addEventListener('click', toggleModal);

refs.loadMoreBtn.addEventListener('click', loadMoreBtnOnClick);

refs.prodList.addEventListener('click', prodListOnClick);

refs.searchForm.addEventListener('submit', searchFormOnSubmit);

refs.clearSearchBtn.addEventListener('click', clearSearchBtnOnClick);

refs.addToCartBtn.addEventListener('click', addToCartBtnOnClick);

refs.addToWishListBtn.addEventListener('click', addToWishListBtnOnClick);

refs.goToTopOfListBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

refs.changeThemeBtn.addEventListener('click', changeThemeBtnOnClick);

refs.increaseBtn.addEventListener('click', () => increaseQuantity());

refs.decreaseBtn.addEventListener('click', () => decreaseQuantity());

// https://www.npmjs.com/package/tui-pagination - lib 4 pagination
