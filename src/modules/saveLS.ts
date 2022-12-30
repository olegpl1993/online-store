import { cartState } from "./state";
import { Product } from "../types/types";

window.addEventListener('beforeunload', () => { // сохранение в LS перед закрытием страницы
  localStorage.setItem('cartState', JSON.stringify(cartState)); // строка из массива
});

export function loadCartStateFromLS(): Product[] { // загрузка из LS
  return localStorage.getItem('cartState') ? JSON.parse(localStorage.getItem('cartState') || '[]') : [];
}
