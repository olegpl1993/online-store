import data from '../data/database.json'

export const products = data.products; // получаем массив продуктов до сортировки

export const state = products; // отсортированный массив (текущее состояние)

export const cartState = [products[0], products[1], products[2]]; // массив продуктов в корзине