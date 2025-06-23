//Логіка сторінки Wishlist
'use strict';

import { refs } from './js/refs';
import { loadWishList } from './js/products-api';
import {
  updateStatusesOfLists,
  prodListOnClick,
  addToCartBtnOnClick,
  addToWishListBtnOnClick,
  changeThemeBtnOnClick,
  loadSavedTheme,
  increaseQuantity,
  decreaseQuantity,
} from './js/handlers';
import { toggleModal } from './js/modal';

loadSavedTheme();
updateStatusesOfLists();
loadWishList();

// console.log(window.location.pathname);

refs.prodList.addEventListener('click', prodListOnClick);

refs.closeModalBtn.addEventListener('click', toggleModal);

refs.addToCartBtn.addEventListener('click', addToCartBtnOnClick);

refs.addToWishListBtn.addEventListener('click', addToWishListBtnOnClick);

refs.changeThemeBtn.addEventListener('click', changeThemeBtnOnClick);

refs.increaseBtn.addEventListener('click', () => increaseQuantity());

refs.decreaseBtn.addEventListener('click', () => decreaseQuantity());
