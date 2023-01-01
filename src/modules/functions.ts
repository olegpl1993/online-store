import { Product } from "../types/types";
import { products } from "./state";

// сортирует state -------------------------------------------------------------------------
export function sortState(sortType: string, finalState: Product[]) {
  if (sortType === 'priceup') finalState.sort((a: Product, b: Product) => a.price - b.price);
  if (sortType === 'pricedown') finalState.sort((a: Product, b: Product) => b.price - a.price);
  if (sortType === 'ratingup') finalState.sort((a: Product, b: Product) => a.rating - b.rating);
  if (sortType === 'ratingdown') finalState.sort((a: Product, b: Product) => b.rating - a.rating);
  return finalState;
}

// фильтрует state --------------------------------------------------------------------------
export function filterState(tempLocalState: Product[]) {
  const queryObj = parseSearch(); // получение query параметров
  let newLocalState: Product[] = [];
  for (const el of queryObj.category) {
    const tempState = tempLocalState.filter(prod => prod.category === el);
    newLocalState = [...newLocalState, ...tempState]; // заполняем пустой массив подходящими по сортировке продуктами
  }
  return newLocalState;
}

// обработка state ---------------------------------------------------------------------------
export function createState() {
  const queryObj = parseSearch(); // получение query параметров
  let tempState: Product[] = [...products];
  if (queryObj.category.length > 0) tempState = filterState(tempState); // фильтррация state по категории
  if (queryObj.sort.length > 0) tempState = sortState(queryObj.sort[0], tempState); // сортировка state
  return [...tempState];
}


// разделяет url строку в обьект { фильтр: [параметры фильтрации] } ---------------------------
export function parseSearch() {
  const hash = window.location.hash; // получает хеш из строки браузера
  const queryString = hash.split('?')[1]; // отделяет поиск от хеша
  const arrOfQuery = queryString ? decodeURI(queryString).split('&') : [];
  const finalQueryObj: Record<string, string[]> = {
    sort: [],
    category: [],
    brand: [],
    price: [],
  };
  for (const el of arrOfQuery) {
    const filterName = el.split('=')[0]; // название фильтра(сортировки)
    const arrParams = el.split('=')[1].split(','); // выбранные параметры
    for (const el of arrParams) {
      finalQueryObj[filterName].push(el);
    }
  }
  return finalQueryObj;
}

// формирует url строку из обьекта ------------------------------------------------------------
function createUrl(queryObj: Record<string, string[]>) {
  let queryString = '#?'; // строка квери запроса
  for (const key in queryObj) {
    if (queryObj[key].length >= 1) { // проверка что массив не пустой
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
  createUrl(queryObj);
}

// удаление из url параметра фильтарции ----------------------------------------
export function delFromUrl(name: string, parametr: string) {
  const queryObj = parseSearch(); // получение query параметров
  if (name === 'category' && queryObj.category.includes(parametr)) queryObj.category.splice(queryObj.category.indexOf(parametr), 1);
  if (name === 'brand' && queryObj.brand.includes(parametr)) queryObj.brand.splice(queryObj.brand.indexOf(parametr), 1);
  createUrl(queryObj);
}

