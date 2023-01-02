import data from '../data/database.json'
import { Product } from '../types/types';
import { loadCartStateFromLS } from './saveLS';
import { createState } from './functions';

export const products = data.products; // получаем массив продуктов до сортировки

export let state = createState(); // отсортированный массив (текущее состояние)

export let cartState: Product[] = loadCartStateFromLS(); // загружает массив продуктов из LS или создает пустой []

export const arrPromoCods = ['RS', 'EPM']; // доступные для ввода промо коды

export const arrActivPromoCods: string[] = []; // массив введеных промо кодов

export const cartPages = {
  limitPrductsOnPage: 5, // количество продуктов на странице cart
  limitPages: 1, // количество страниц с продуктами cart
  curentPage: 1 // текущая страница cart
}

// обработка state в соотвествии с query в url адресе (для повторного вызова при изменении url)
export const updateState = () => state = createState();

// очистка корзины
export const clearCartState = () => cartState = [];