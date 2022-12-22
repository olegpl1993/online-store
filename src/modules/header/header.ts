import './header.scss';
import { createElement } from '../createElement'
import { route } from '../..'
import { cartState } from '../state';

export function header(headerBox: HTMLElement) {
  const header = createElement(headerBox, 'div', 'header');
  const logo = createElement(header, 'a', 'logo', 'Online Store');
  (logo as HTMLAnchorElement).href = '#';
  const menu = createElement(header, 'div', 'menu');

  const total = createElement(header, 'div', 'total');
  const cartTotal = createElement(total, 'div', 'cartTotal', 'Cart total:');

  const totalSum = cartState.reduce((acc, val) => acc + val.price, 0); // сумма всех товаров в корзине
  const sumTotal = createElement(total, 'div', 'sumTotal', `$${totalSum}.00`);

  const cartImg = createElement(header, 'div', 'cartImg');
  const productsInCart = createElement(cartImg, 'a', 'productsInCart', cartState.length);
  (productsInCart as HTMLAnchorElement).href = '#cart';

  logo.addEventListener('click', (event) => route(event));
  productsInCart.addEventListener('click', (event) => route(event));

  return header;
}