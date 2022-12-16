import './index.scss'
import { createElement } from './modules/createElement'
import { header } from './modules/header/header'
import { footer } from './modules/footer/footer'
import { main } from './modules/main/main'
import { card } from './modules/card/card'
import { error } from './modules/error/error'

const wrapper = createElement(document.body, 'div', 'wrapper');
const headerBox = createElement(wrapper, 'div', 'headerBox');
export const contentBox = createElement(wrapper, 'div', 'contentBox');
const footerBox = createElement(wrapper, 'div', 'footerBox');

export function route(event: Event) {
  event.preventDefault();
  window.history.pushState({}, "", (event.target as HTMLAnchorElement).href);
  router();
}

function router() {
  const path = window.location.pathname;
  console.log(path)
  while (contentBox.firstChild) contentBox.removeChild(contentBox.firstChild) // очищаем узел contentBox
  if (path === '/') main(contentBox)  // отрисовка выбраной страницы
  if (path === '/card') card(contentBox)
  if (path === '/404') error(contentBox)
}

window.addEventListener('load', () => {
  header(headerBox);
  footer(footerBox);
  router();
});