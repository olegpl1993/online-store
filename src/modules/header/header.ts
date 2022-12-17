import './header.scss';
import { createElement } from '../createElement'
import { route } from '../..'
import cart from '../../images/cart.png'

export function header(headerBox: HTMLElement) {
  const header = createElement(headerBox, 'div', 'header');
  const logo = createElement(header, 'div', 'logo', 'MyOnlineStore');
  const menu = createElement(header, 'div', 'menu');
  const linkMain = createElement(menu, 'a', 'link linkMain', 'Main Page');
  const linkCart = createElement(menu, 'a', 'link linkCart', 'Cart Page');
  const linkProduct = createElement(menu, 'a', 'link linkProduct', 'Product Page');
  const cartImg = createElement(header, 'img', 'cartImg');
  (cartImg as HTMLImageElement).src = cart;

  (linkMain as HTMLAnchorElement).href = '#';
  (linkCart as HTMLAnchorElement).href = '#cart';
  (linkProduct as HTMLAnchorElement).href = '#product';

  linkMain.addEventListener('click', (event) => route(event));
  linkCart.addEventListener('click', (event) => route(event));
  linkProduct.addEventListener('click', (event) => route(event));
  return header;
}