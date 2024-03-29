import { Product } from "../types/types";
import { products } from "./state";

// обработка state -----------------------------------------------------------------------------------------------------
export function createState() {
  const queryObj = parseSearch(); // получение query параметров
  let tempState: Product[] = [...products];
  if (queryObj.category[0]) tempState = filterCategory(tempState); // фильтррация state по категории
  if (queryObj.brand[0]) tempState = filterBrand(tempState); // фильтррация state по бренду
  if (queryObj.price[0]) tempState = filterPrice(tempState); // фильтррация state по цене
  if (queryObj.sort[0]) tempState = sortState(queryObj.sort[0], tempState); // сортировка state
  if (queryObj.search[0]) tempState = searchTitle(tempState); // сортировка state
  return [...tempState];
}

// сортирует state 
export function sortState(sortType: string, finalState: Product[]) {
  if (sortType === 'priceup') finalState.sort((a: Product, b: Product) => a.price - b.price);
  if (sortType === 'pricedown') finalState.sort((a: Product, b: Product) => b.price - a.price);
  if (sortType === 'ratingup') finalState.sort((a: Product, b: Product) => a.rating - b.rating);
  if (sortType === 'ratingdown') finalState.sort((a: Product, b: Product) => b.rating - a.rating);
  return finalState;
}

// фильтрует state 
function filterCategory(tempLocalState: Product[]) {
  const queryObj = parseSearch(); // получение query параметров
  let newLocalState: Product[] = [];
  for (const el of queryObj.category) {
    const tempState = tempLocalState.filter(prod => prod.category === el);
    newLocalState = [...newLocalState, ...tempState]; // заполняем пустой массив подходящими по сортировке продуктами
  }
  return newLocalState;
}

function filterPrice(tempLocalState: Product[]) {
  const queryObj = parseSearch(); // получение query параметров
  let newLocalState: Product[] = [];
  const tempState = tempLocalState
    .filter(prod => prod.price >= Number(queryObj.price[0].split('/')[0]) && prod.price <= Number(queryObj.price[0].split('/')[1]));
  newLocalState = [...newLocalState, ...tempState]; // заполняем пустой массив подходящими по сортировке продуктами
  return newLocalState;
}

function filterBrand(tempLocalState: Product[]) {
  const queryObj = parseSearch(); // получение query параметров
  let newLocalState: Product[] = [];
  for (const el of queryObj.brand) {
    const tempState = tempLocalState.filter(prod => prod.brand === el);
    newLocalState = [...newLocalState, ...tempState]; // заполняем пустой массив подходящими по сортировке продуктами
  }
  return newLocalState;
}

function searchTitle(tempLocalState: Product[]) {
  const queryObj = parseSearch(); // получение query параметров
  const searchText = queryObj.search[0].toLowerCase(); // текст для поиска
  const searchInTitle = tempLocalState.filter(prod => (prod.title.toLowerCase()).includes(searchText));
  const searchInDescription = tempLocalState.filter(prod => (prod.description.toLowerCase()).includes(searchText));
  const searchInBrand = tempLocalState.filter(prod => (prod.brand.toLowerCase()).includes(searchText));
  const searchInCategory = tempLocalState.filter(prod => (prod.category.toLowerCase()).includes(searchText));
  const searchInPrice = tempLocalState.filter(prod => (String(prod.price).toLowerCase()).includes(searchText));
  const tempState = Array.from(new Set([...searchInTitle, ...searchInDescription, ...searchInBrand, ...searchInCategory, ...searchInPrice]));
  return tempState;
}
// ----------------------------------------------------------------------------------------------------------------------

// разделяет url строку в обьект { фильтр: [параметры фильтрации] } ---------------------------
export function parseSearch() {
  const hash = window.location.hash; // получает хеш из строки браузера
  const queryString = hash.split('?')[1]; // отделяет поиск от хеша
  const arrOfQuery = queryString ? decodeURI(queryString).split('&') : [];
  const finalQueryObj: Record<string, string[]> = {
    sort: [],
    search: [],
    category: [],
    brand: [],
    price: [],
    size: [],
    filterDisplay: [],
    notCorrectQuery: []
  };
  for (const el of arrOfQuery) {
    const filterName = el.split('=')[0]; // название фильтра(сортировки)
    const arrParams = el.split('=')[1].split(','); // выбранные параметры
    for (const el of arrParams) {
      if (finalQueryObj[filterName]) finalQueryObj[filterName].push(el)
      else finalQueryObj.notCorrectQuery.push('true');
    }
  }
  return finalQueryObj;
}

// формирует url строку из обьекта ------------------------------------------------------------
function createUrl(queryObj: Record<string, string[]>) {
  let queryString = '#?'; // строка квери запроса
  for (const key in queryObj) {
    if (queryObj[key][0]) { // проверка что массив не пустой
      if (queryString.length > 2) queryString += `&`; // если в строке уже есть фильтр добаление разделителя 
      queryString += `${key}=${queryObj[key]}`; // добаление основного селектора
    }
  }
  window.history.pushState({}, "", queryString); // добавляет query в URL
}

// добавление в url строку нового параметра фильтарции ----------------------------------------
export function addToUrl(name: string, parametr: string) {
  const queryObj = parseSearch(); // получение query параметров
  if (name === 'sort') queryObj.sort = [parametr]; // добавление в обьект нового параметра
  if (name === 'category' && (!(queryObj.category.includes(parametr)))) queryObj.category.push(parametr);
  if (name === 'brand' && (!(queryObj.brand.includes(parametr)))) queryObj.brand.push(parametr);
  if (name === 'search') queryObj.search = [encodeURI(parametr)];
  if (name === 'price') queryObj.price = [encodeURI(parametr)];
  if (name === 'size') queryObj.size = [encodeURI(parametr)];
  if (name === 'filterDisplay') queryObj.filterDisplay = [encodeURI(parametr)];
  createUrl(queryObj);
}

// удаление из url параметра фильтарции ----------------------------------------
export function delFromUrl(name: string, parametr: string) {
  const queryObj = parseSearch(); // получение query параметров
  if (name === 'category' && queryObj.category.includes(parametr)) queryObj.category.splice(queryObj.category.indexOf(parametr), 1);
  if (name === 'brand' && queryObj.brand.includes(parametr)) queryObj.brand.splice(queryObj.brand.indexOf(parametr), 1);
  if (name === 'price') queryObj.price = [];
  if (name === 'filterDisplay') queryObj.filterDisplay = [];
  createUrl(queryObj);
}
