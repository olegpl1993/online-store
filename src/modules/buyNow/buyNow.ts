import './buyNow.scss';
import { createElement } from '../createElement';

export function buyNow(buyNowBox: HTMLElement) {
  while (buyNowBox.firstChild) buyNowBox.removeChild(buyNowBox.firstChild); // очищаем узел buyNowBox

  const buyNowWindow = createElement(buyNowBox, 'div', 'buyNow', 'buyNowWindow');
  buyNowWindow.addEventListener("click", e => e.stopPropagation()); //отменяет всплытие

  return buyNowWindow;
}