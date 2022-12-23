import './main.scss'
import { createElement } from '../createElement'
import { products } from '../state';
import { card } from '../card/card';
import { state } from '../state';

export function main(contentBox: HTMLElement) {
  const main = createElement(contentBox, 'div', 'main');
  const mainFilterColum = createElement(main, 'div', 'mainFilterColum');
  const mainProductsColum = createElement(main, 'div', 'mainProductsColum');

  // кнопки очистить фильтры и копировать ссылку ---------------------------------------
  const mainFilterBtnRow = createElement(mainFilterColum, 'div', 'mainFilterBtnRow');
  const mainFilterBtnResetFilters = createElement(mainFilterBtnRow, 'button', 'mainFilterBtnResetFilters', `Reset filters`);
  const mainFilterBtnCopyLink = createElement(mainFilterBtnRow, 'button', 'mainFilterBtnCopyLink', `Copy link`);

  // фильтр катигории --------------------------------------------------------------------------
  const mainFilterCategoryBox = createElement(mainFilterColum, 'div', 'mainFilterCategoryBox');
  const mainFilterCategoryTitle = createElement(mainFilterCategoryBox, 'div', 'mainFilterCategoryTitle', `Category`);
  const mainFilterCategoryList = createElement(mainFilterCategoryBox, 'div', 'mainFilterCategoryList');

  const categoryListObj = products.map((product) => product.category) // обьект с категориями и количеством товара
    .reduce((acc: any, el: string) => { acc[el] = (acc[el] || 0) + 1; return acc }, {}); // TODO (типизировать ANY)

  for (const key in categoryListObj) {
    mainFilterCategoryList.innerHTML += `
    <div class="categoryRow">
      <input type="checkbox">
      <div class="categoryName">${key}</div>
      <div class="categoryCount">${categoryListObj[key]}</div>
    </div>`
  }

  // фильтр бренд -------------------------------------------------------------------------------
  const mainFilterBrandBox = createElement(mainFilterColum, 'div', 'mainFilterBrandBox');
  const brandTitle = createElement(mainFilterBrandBox, 'div', 'brandTitle', `Brand`);
  const brandList = createElement(mainFilterBrandBox, 'div', 'brandList');

  const brandListObj = products.map((product) => product.brand) // обьект с категориями и количеством товара
    .reduce((acc: any, el: string) => { acc[el] = (acc[el] || 0) + 1; return acc }, {}); // TODO (типизировать ANY)

  for (const key in brandListObj) {
    brandList.innerHTML += `
      <div class="brandRow">
        <input type="checkbox">
        <div class="brandName">${key}</div>
        <div class="brandCount">${brandListObj[key]}</div>
      </div>`
  }

  // фильтр цена -----------------------------------------------------------------------------
  const priceBox = createElement(mainFilterColum, 'div', 'priceBox');
  const priceTitle = createElement(priceBox, 'div', 'priceTitle', `Price`);
  const fromToBox = createElement(priceBox, 'div', 'fromToBox');
  const fromToRow = createElement(fromToBox, 'div', 'fromToRow', `$${5} ⟷ $${1500}`);

  const fromToRange = createElement(fromToBox, 'input', 'fromToRange');
  (fromToRange as HTMLInputElement).type = 'range';

  // блок с сортировкой карточек ------------------------------------------------------------------
  const sortCardBox = createElement(mainProductsColum, 'div', 'sortCardBox');

  const sortCardSelect = createElement(sortCardBox, 'select', 'sortCardSelect');
  const sortCardOption1  = createElement(sortCardSelect, 'option', 'sortCardOption', 'Sort by price ↑');
  sortCardOption1.setAttribute('value','Price sort Ascending');
  const sortCardOption2  = createElement(sortCardSelect, 'option', 'sortCardOption', 'Sort by price ↓');
    sortCardOption2.setAttribute('value','Price Sort Descending');
  const sortCardOption3  = createElement(sortCardSelect, 'option', 'sortCardOption', 'Sort by rating ↑');
    sortCardOption3.setAttribute('value','Rating Sort Ascending');
  const sortCardOption4  = createElement(sortCardSelect, 'option', 'sortCardOption', 'Sort by rating ↓');
    sortCardOption4.setAttribute('value','Rating Sort Descending');
  const foundCard = createElement(sortCardBox, 'div', 'sortCardSelect', `Found: ${state.length}`);
  //TODO Разобраться с отрисовкой по event
  sortCardSelect.addEventListener('change', e => {
    const selectedTargetEvent = e.target as HTMLSelectElement;
    const selectedTargetValue = selectedTargetEvent.value;
    const selectedValueArray = selectedTargetValue.split(' ');
    const selectedSortingValue = selectedValueArray[0];
    const selectedSortingType = selectedValueArray[selectedValueArray.length - 1];
    if (selectedSortingType === 'Descending') {
      products.sort(SortDescendingByField(selectedSortingValue));
      for (const product in products) {
        card(mainProductsCardBox, +product);
        console.log(1);
      }
    } else if(selectedSortingType === 'Ascending') {
      products.sort(SortAscendingByField(selectedSortingValue));
      for (const product in products) {
        card(mainProductsCardBox, +product);
        console.log(2);
      }
    }

  })
  const searchCard = createElement(sortCardBox, 'input', 'searchCard');
  (searchCard as HTMLInputElement).type = 'search';
  (searchCard as HTMLInputElement).placeholder = 'Search product';

  // блок с карточками ----------------------------------------------------------------------

  const mainProductsCardBox = createElement(mainProductsColum, 'div', 'mainProductsCardBox');
/*   for (const product in products) {
    card(mainProductsCardBox, +product);
  } */

  return main;
}
//TODO Сделать DRY для этого кода
function SortDescendingByField(fieldName:any) {
  return (a:any, b:any) => a[fieldName.toLowerCase()] > b[fieldName.toLowerCase()] ? -1 : 1;
}
function SortAscendingByField(fieldName:any) {
  return (a:any, b:any) => a[fieldName.toLowerCase()] > b[fieldName.toLowerCase()] ? 1 : -1;
}