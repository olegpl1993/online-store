import './header.scss';
import { createElement } from '../createElement'
import { route } from '../..'

export function header(headerBox: HTMLElement) {
  const header = createElement(headerBox, 'div', 'header');
  const logo = createElement(header, 'div', 'logo', 'Online Store');
  const menu = createElement(header, 'div', 'menu');
  const linkMain = createElement(menu, 'a', 'link linkMain', 'Main Page');
  (linkMain as HTMLAnchorElement).href = '#';
  const linkCart = createElement(menu, 'a', 'link linkCart', 'Cart Page');
  (linkCart as HTMLAnchorElement).href = '#cart';
  const linkProduct = createElement(menu, 'a', 'link linkProduct', 'Product Page');
  (linkProduct as HTMLAnchorElement).href = '#product';

  const total = createElement(header, 'div', 'total');
  const cartTotal = createElement(total, 'div', 'cartTotal', 'Cart total:');
  const sumTotal = createElement(total, 'div', 'sumTotal', '$128.00');

  const cartImg = createElement(header, 'div', 'cartImg');
  const productsInCart = createElement(cartImg, 'div', 'productsInCart', '12');

  linkMain.addEventListener('click', (event) => route(event));
  linkCart.addEventListener('click', (event) => route(event));
  linkProduct.addEventListener('click', (event) => route(event));
  return header;
}