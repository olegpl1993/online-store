import './header.scss';
import { createElement } from '../createElement'
import { route } from '../..';

export function header(headerBox: HTMLElement) {
  const header = createElement(headerBox, 'div', 'header');
  const logo = createElement(header, 'div', 'logo', 'MyOnlineStore');
  const menu = createElement(header, 'div', 'menu');
  const linkMain = createElement(menu, 'a', 'link linkMain', 'Main Page');
  const linkCart = createElement(menu, 'a', 'link linkCart', 'Cart Page');
  const linkProduct = createElement(menu, 'a', 'link linkProduct', 'Product Page');

  (linkMain as HTMLAnchorElement).href = '#';
  (linkCart as HTMLAnchorElement).href = '#cart';
  (linkProduct as HTMLAnchorElement).href = '#product';

  linkMain.addEventListener('click', (event) => route(event));
  linkCart.addEventListener('click', (event) => route(event));
  linkProduct.addEventListener('click', (event) => route(event));
  return header;
}