import './index.scss'
import { createElement } from './modules/createElement'
import { header } from './modules/header/header'
import { footer } from './modules/footer/footer'
import { main } from './modules/main/main'
import { cart } from './modules/cart/cart'
import { error } from './modules/error/error'
import { product } from './modules/product/product'

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
  const randomNumberItemProduct: number = Math.floor(Math.random() * 100); //рандомное число карточки для отрисовки
  if (hash === '') main(contentBox) // отрисовка выбраной страницы
  else if (hash === '#cart') cart(contentBox, randomNumberItemProduct)
  else if (hash === '#product') product(contentBox, 1)
  else error(contentBox)
}

window.addEventListener('load', () => {
  header(headerBox);
  footer(footerBox);
  router();
});