import { Product } from "../types/types";
import { state } from "./state";

export function sortState(sortType: string) {
  if (sortType === 'priceup') state.sort((a: Product, b: Product) => a.price - b.price);
  if (sortType === 'pricedown') state.sort((a: Product, b: Product) => b.price - a.price);
  if (sortType === 'ratingup') state.sort((a: Product, b: Product) => a.rating - b.rating);
  if (sortType === 'ratingdown') state.sort((a: Product, b: Product) => b.rating - a.rating);
}

export function parseSearch(hash: string) {
  const queryString = hash.split('?')[1]; // отделяет поиск от хеша
  const queryArr = queryString ? queryString.split('=') : []; // разделение в массив
  const queryObj = { [queryArr[0]]: queryArr[1] }; // обьект из масива
  return queryObj;
}