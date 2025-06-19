'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

iziToast.settings({
  position: 'topRight',
});

//Допоміжні функції

export function showErrorMsg(msg) {
  iziToast.error({
    title: 'Error',
    message: msg,
  });
}

export function showInfoMsg(msg) {
  iziToast.info({
    message: msg,
  });
}
