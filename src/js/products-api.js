'use strict';

// Функції для роботи з бекендом

import axios from 'axios';
import {
  renderProducts,
  renderCategories,
  renderProduct,
} from './render-function';
import { showErrorMsg, showInfoMsg } from './helpers';
import { refs } from './refs';
import { getDataFromLS, setDataToLS } from './storage';
import { STORAGE_KEYS } from './constants';
// import { increaseQuantity, decreaseQuantity } from './handlers';

axios.defaults.baseURL = 'https://dummyjson.com/products/';

let page = 1;
let totalPages = 0;

export async function getCategoryList() {
  const response = await axios.get('category-list');
  return response.data;
}

export async function getProductsByCategory(category, page) {
  const response = await axios.get('category/' + category.trim(), {
    params: { limit: 12, skip: (page - 1) * 12 },
  });
  return response.data;
}

export async function getProductById(id) {
  const response = await axios.get(id.trim());
  return response.data;
}

export async function getProductsByQuery(query) {
  const response = await axios.get('search', {
    params: { q: query },
  });
  return response.data;
}

export async function getProducts(page) {
  const response = await axios.get('', {
    params: { limit: 12, skip: (page - 1) * 12 },
  });
  return response.data;
}

export function loadWishList() {
  const wlArray = getDataFromLS(STORAGE_KEYS.wishlist, []);

  const promises = wlArray.map(id => {
    return axios.get(id.trim());
  });

  Promise.allSettled(promises).then(data => {
    const products = [];
    data.forEach(item => {
      if (item.status === 'fulfilled') {
        products.push(item.value.data);
      }
    });
    renderProducts(products, true);
  });
}

export function loadCartList() {
  const cartArray = getDataFromLS(STORAGE_KEYS.cart, []);

  const promises = cartArray.map(({ id }) => {
    return axios.get(id.trim());
  });

  Promise.allSettled(promises).then(data => {
    const products = [];
    data.forEach(item => {
      if (item.status === 'fulfilled') {
        products.push(item.value.data);
      }
    });
    renderProducts(products, true);
    updateCartData(cartArray);
  });
}

export function updateCartData(cartArray) {
  refs.spanCartDataCount.textContent = cartArray
    .reduce((sum, { quantity }) => sum + quantity, 0)
    .toFixed(2);
  refs.spanCartDataPrice.textContent = cartArray
    .reduce((sum, { price, quantity }) => sum + quantity * price, 0)
    .toFixed(2);
}
///////////////////////////////////

export function resetNumeration() {
  page = 1;
  totalPages = 0;
}

export const getCategories = async () => {
  try {
    let categories = await getCategoryList();
    // console.dir(categories); //вертає масив рядків
    categories = ['All', ...categories];
    renderCategories(categories);
  } catch (error) {
    console.log(error);
  } finally {
  }
};

function handleProducts(products, append) {
  // console.dir(products); //вертає об'єкт у властивості products - сидить масив обєктів товарів,
  // є поля limit = кількість товарів на сторінку, skip=індекс сторінки, total=загальна кількість товарів у виборці
  totalPages = Math.ceil(products.total / 12);
  if (products.products.length > 0) {
    hideNotFound();
    renderProducts(products.products, append);

    if (page >= totalPages) {
      hideLoadMoreButton();
      showInfoMsg("We're sorry, but you've reached the end of search results.");
    } else {
      showLoadMoreButton();
    }
    page++;
  } else {
    clearProductList();
    showNotFound();

    hideLoadMoreButton();
    showErrorMsg(
      'Sorry, there are no images matching your search query.Please try again!'
    );
  }
}

export const getProductsList = async (append = false) => {
  try {
    const products = await getProducts(page);
    // console.log(products);

    handleProducts(products, append);
  } catch (error) {
    hideLoadMoreButton();
    showErrorMsg('Error loading images from the server!');
  } finally {
    hideLoader();
  }
};

export const getNextProductsByCategory = async (category, append = false) => {
  try {
    const products = await getProductsByCategory(category, page);
    // console.dir(products); //вертає масив об'єктів товарів
    if (products.products.length === 0) {
      showNotFound();
      showErrorMsg(`Don't found products by ${category}!`);
    } else {
      hideNotFound();
    }
    handleProducts(products, append);
  } catch (error) {
    hideLoadMoreButton();
    showErrorMsg('Error loading images from the server!');
  } finally {
    hideLoader();
  }
};

export function clearProductList() {
  refs.prodList.innerHTML = '';
}

export function showNotFound() {
  refs.divNotFound.classList.add('not-found--visible');
}

export function hideNotFound() {
  refs.divNotFound.classList.remove('not-found--visible');
}

export const getNextProductById = async id => {
  try {
    const product = await getProductById(id);
    // console.dir(product); //вертає об'єкт товару
    renderProduct(product);
  } catch (error) {
    console.log(error);
  } finally {
  }
};

export const getNextProductsByQuery = async (query, append = false) => {
  try {
    const products = await getProductsByQuery(query, page);
    // console.dir(products); //вертає масив об'єктів товарів
    if (products.products.length === 0) {
      showNotFound();
      showErrorMsg(`Don't found products by query "${query}"!`);
    } else {
      hideNotFound();
    }
    handleProducts(products, append);
  } catch (error) {
    hideLoadMoreButton();
    showErrorMsg('Error loading images from the server!');
  } finally {
    hideLoader();
  }
};

export function showLoader() {
  refs.loader.style.display = 'block';
}

export function hideLoader() {
  refs.loader.style.display = 'none';
}

export function showLoadMoreButton() {
  refs.loadMoreBtn.style.display = 'block';
}

export function hideLoadMoreButton() {
  refs.loadMoreBtn.style.display = 'none';
}
