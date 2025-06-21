'use strict';

import { refs } from './refs';

//Функцію для створення, рендеру або видалення розмітки
export function renderCategories(arrCat) {
  refs.catList.innerHTML = arrCat
    .map(
      cat => `<li class="categories__item">
                 <button class="categories__btn" type="button">${cat}</button>
              </li>`
    )
    .join('');
}

export function renderProducts(arrProd, append = false) {
  const markUp = arrProd
    .map(
      ({
        id,
        title,
        brand,
        category,
        price,
        description,
        images: [img = '/'],
      }) => `<li class="products__item" data-id="${id}">
                <img class="products__image" src="${img}" alt="${description}"/>
                <p class="products__title">${title}</p>
                <p class="products__brand"><span class="products__brand--bold">Brand:</span>${brand}</p>
                <p class="products__category">Category: ${category}</p>
                <p class="products__price">Price: ${price}$</p>
             </li>`
    )
    .join('');
  if (append) {
    refs.prodList.insertAdjacentHTML('beforeend', markUp);
  } else {
    refs.prodList.innerHTML = markUp;
  }
}

export function renderProduct({
  title,
  tags,
  shippingInformation,
  price,
  description,
  returnPolicy,
  images: [img = '/'],
}) {
  const markUp = `<img class="modal-product__img" src="${img}" alt="${description}" />
                  <div class="modal-product__content">
                      <p class="modal-product__title">${title}</p>
                      <ul class="modal-product__tags">${tags.join()}</ul>
                      <p class="modal-product__description">${description}</p>
                      <p class="modal-product__shipping-information">Shipping:${shippingInformation}</p>
                      <p class="modal-product__return-policy">Return Policy:${returnPolicy}</p>
                      <p class="modal-product__price">Price: ${price}$</p>
                      <button class="modal-product__buy-btn" type="button">Buy</button>
                  </div>`;
  refs.modalProduct.innerHTML = markUp;
}
