//Логіка сторінки Cart
'use strict';

import { refs } from './js/refs';
import { loadCartList } from './js/products-api';
import {
  updateStatusesOfLists,
  prodListOnClick,
  addToCartBtnOnClick,
  addToWishListBtnOnClick,
  cartBuyBtnOnClick,
  changeThemeBtnOnClick,
  loadSavedTheme,
} from './js/handlers';
import { toggleModal } from './js/modal';

loadSavedTheme();
updateStatusesOfLists();
loadCartList();

refs.prodList.addEventListener('click', prodListOnClick);

refs.closeModalBtn.addEventListener('click', toggleModal);

refs.addToCartBtn.addEventListener('click', addToCartBtnOnClick);

refs.addToWishListBtn.addEventListener('click', addToWishListBtnOnClick);

refs.cartBuyBtn.addEventListener('click', cartBuyBtnOnClick);

refs.changeThemeBtn.addEventListener('click', changeThemeBtnOnClick);
