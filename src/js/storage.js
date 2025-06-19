//Робота з loacalStorage
'use strict';

export function setDataToLS(KEY, Data) {
  localStorage.setItem(KEY, JSON.stringify(Data));
}

export function getDataFromLS(KEY, emptyData = '') {
  const savedData = localStorage.getItem(KEY);
  let data = emptyData;
  if (savedData) {
    try {
      data = JSON.parse(savedData);
    } catch (error) {
      data = emptyData;
      console.error('Error restoring data from the localStorage:', error);
    }
  }
  return data;
}
