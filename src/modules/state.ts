import data from '../data/database.json'
import { Product } from '../types/types';

export const products = data.products; // получаем массив продуктов до сортировки

export const state = [...products]; // отсортированный массив (текущее состояние)

export const cartState: Product[] = []; // массив продуктов в корзине

export const arrPromoCods = ['RS', 'EPM']; // доступные для ввода промо коды

export const arrActivPromoCods: string[] = []; // массив введеных промо кодов

export const cartPages = {
  limitPrductsOnPage: 5, // количество продуктов на странице cart
  limitPages: 1, // количество страниц с продуктами cart
  curentPage: 1 // текущая страница cart
}
