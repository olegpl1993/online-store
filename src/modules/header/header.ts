import './header.scss';
import { createElement } from '../createElement'
import { route } from '../..';

export function header(headerBox: HTMLElement) {
  const header = createElement(headerBox, 'div', 'header');
  const logo = createElement(header, 'div', 'logo', 'MyOnlineStore');
  const menu = createElement(header, 'div', 'menu');
  const linkMain = createElement(menu, 'a', 'link linkMain', 'Main Page');
  const linkCard = createElement(menu, 'a', 'link linkCard', 'Card Page');
  const link404 = createElement(menu, 'a', 'link link404', '404 Page');

  (linkMain as HTMLAnchorElement).href = '/';
  (linkCard as HTMLAnchorElement).href = '/card';
  (link404 as HTMLAnchorElement).href = '/404';

  linkMain.addEventListener('click', (event) => route(event));
  linkCard.addEventListener('click', (event) => route(event));
  link404.addEventListener('click', (event) => route(event));
  return header;
}