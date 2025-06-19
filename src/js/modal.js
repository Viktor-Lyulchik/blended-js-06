'use strict';
import { refs } from './refs';

//Описана робота модалки - відкриття закриття і все що з модалкою повʼязано

export function toggleModal() {
  // is-open це клас який буде додаватися/забиратися на бекдроп при натисканні на кнопки
  refs.modal.classList.toggle('modal--is-open');
}
