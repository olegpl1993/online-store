import './index.scss'
import { createElement } from './modules/createElement'
import { header } from './modules/header/header'
import { footer } from './modules/footer/footer'
import { main } from './modules/main/main'
import { error } from './modules/error/error'
import { product } from './modules/product/product'
import { cart } from './modules/cart/cart'

export const wrapper = createElement(document.body, 'div', 'wrapper');
export const headerBox = createElement(wrapper, 'div', 'headerBox');
export const contentBox = createElement(wrapper, 'div', 'contentBox');
export const footerBox = createElement(wrapper, 'div', 'footerBox');

export function route(event: Event) {
  event.preventDefault();
  window.history.pushState({}, "", (event.target as HTMLAnchorElement).href); //меняет строку в браузере
  router();
}

function router() {
  const hash = window.location.hash; //получает хеш из строки браузера
  while (contentBox.firstChild) contentBox.removeChild(contentBox.firstChild); // очищаем узел contentBox
  const chekPage = hash.split('/')[0]; // страницa на которую перйти
  if (chekPage === '' || chekPage.includes('#?')) main(contentBox) // отрисовка выбраной страницы
  else if (chekPage === '#cart') cart(contentBox)
  else if (chekPage === '#product') product(contentBox, +hash.split('/')[1])
  else error(contentBox)
}

window.addEventListener('load', () => {
  header(headerBox);
  footer(footerBox);
  router();
});

// для проверки выполнения задания
console.log(`
Страница товаров с фильтрами +115 / 120
1 Реализована фильтрация продуктов +35 / 40 (реализован только один блок с ползунком)
2 Реализована сортировка продуктов +20
3 Реализован текстовый поиск по всем данным продуктов +15
4 Реализовано переключение вида найденных продуктов +10
5 Реализован роутинг с query-параметрами +10
6 Реализованы кнопки сброса и копирования поиска +10
7 Реализован блок кол-ва найденных товаров +5
8 Поведение карточек найденных товаров +10

Страница корзины товаров +60 / 60
1 Реализован блок отображения добавленных продуктов +5
2 Реализовано увеличение кол-ва конкретного товара и его удаление +10
3 Реализована пагинация +15
4 Хранение данных в localStorage +10
5 Реализован промокод блок +10
6 Реализована кнопка открытия модального окна оформления покупки + 5
7 Реализован блок с общей суммой и кол-вом всех выбранных товаров +5

Модальное окно оформления товара +50 / 50
1 Реализован блок ввода персональной информации с валидацией +20
2 Реализован блок ввода данных банковской карты с валидацией +20
3 Реализована кнопка завершения заказа +10

Страница с описанием товара +40 / 40
1 Реализованы блоки страницы +30
2 Страница открывается в новом окне по ссылке с id/name товара +10

Header +20 / 20
1 Header содержит корзину товаров +10
2 Header содержит общую сумму покупок +10

Страница 404 +10 / 10
1 Страница существует +6
2 Страница не реагирует на некорректные query-параметры +4

Итого 295 / 300
`)