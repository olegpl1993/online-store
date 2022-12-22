import './index.scss'
import { createElement } from './modules/createElement'
import { header } from './modules/header/header'
import { footer } from './modules/footer/footer'
import { main } from './modules/main/main'
import { error } from './modules/error/error'
import { product } from './modules/product/product'
import { cart } from './modules/cart/cart'

const wrapper = createElement(document.body, 'div', 'wrapper');
const headerBox = createElement(wrapper, 'div', 'headerBox');
const contentBox = createElement(wrapper, 'div', 'contentBox');
const footerBox = createElement(wrapper, 'div', 'footerBox');

export function route(event: Event) {
  event.preventDefault();
  window.history.pushState({}, "", (event.target as HTMLAnchorElement).href); //меняет строку в браузере
  router();
}

function router() {
  const hash = window.location.hash; //получает хеш из строки браузера
  while (contentBox.firstChild) contentBox.removeChild(contentBox.firstChild); // очищаем узел contentBox
  const chekPage = hash.split('/')[0]; // страницa на которую перйти
  if (chekPage === '') main(contentBox) // отрисовка выбраной страницы
  else if (chekPage === '#cart') cart(contentBox)
  else if (chekPage === '#product') product(contentBox, +hash.split('/')[1])
  else error(contentBox)
}

window.addEventListener('load', () => {
  header(headerBox);
  footer(footerBox);
  router();
});