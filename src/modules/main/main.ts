import './main.scss'
import { createElement } from '../createElement'
import { products } from '../state';
import { cart } from '../cart/cart';

export function main(contentBox: HTMLElement) {
  const main = createElement(contentBox, 'div', 'main');

  const mainFilterColum = createElement(main, 'div', 'mainFilterColum');
  const mainProductsColum = createElement(main, 'div', 'mainProductsColum');

  // блок с карточками товаров ---------------------------------------------------------
  const mainProductsCardBox = createElement(mainProductsColum, 'div', 'mainProductsCardBox');
  for (const product in products) {
    console.log(+product)
    cart(mainProductsCardBox, +product)
  }

  // кнопки очистить фильтры и копировать ссылку ---------------------------------------
  const mainFilterBtnRow = createElement(mainFilterColum, 'div', 'mainFilterBtnRow');
  const mainFilterBtnResetFilters = createElement(mainFilterBtnRow, 'button', 'mainFilterBtnResetFilters', `Reset filters`);
  const mainFilterBtnCopyLink = createElement(mainFilterBtnRow, 'button', 'mainFilterBtnCopyLink', `Copy link`);

  // Блок катигории --------------------------------------------------------------------
  const mainFilterCategoryBox = createElement(mainFilterColum, 'div', 'mainFilterCategoryBox');
  const mainFilterCategoryTitle = createElement(mainFilterCategoryBox, 'div', 'mainFilterCategoryTitle', `Category`);
  const mainFilterCategoryList = createElement(mainFilterCategoryBox, 'div', 'mainFilterCategoryList');

  const categoryList = products.map((product) => product.category) // обьект с категориями и количеством товара
    .reduce((acc: any, el: string) => { acc[el] = (acc[el] || 0) + 1; return acc }, {}); // TODO (типизировать ANY)

  for (const key in categoryList) {
    mainFilterCategoryList.innerHTML += `
    <div class="mainFilterCategoryRow">
      <input type="checkbox">
      <div class="mainFilterCategoryName">${key}</div>
      <div class="mainFilterCategoryCount">${categoryList[key]}</div>
    </div>`
  }
  // -------------------------------------------------------------------------------------------

  return main;
}