import './main.scss'
import { createElement } from '../createElement'
import { card } from '../card/card';
import { products } from './../state';
import { state } from '../state';
import { parseSearch } from '../functions';
import { addToUrl } from '../functions';
import { delFromUrl } from '../functions';
import { updateState } from './../state';

export function main(contentBox: HTMLElement) {
  while (contentBox.firstChild) contentBox.removeChild(contentBox.firstChild); // очищаем узел contentBox

  const queryObj = parseSearch(); // получение query параметров
  updateState(); // обновить фильтрацию и сортировку state

  const mainBox = createElement(contentBox, 'div', 'main');
  const mainFilterColum = createElement(mainBox, 'div', 'mainFilterColum');
  const mainProductsColum = createElement(mainBox, 'div', 'mainProductsColum');

  // кнопки очистить фильтры и копировать ссылку ---------------------------------------
  const filterBtnRow = createElement(mainFilterColum, 'div', 'mainFilterBtnRow');
  const resetFilters = createElement(filterBtnRow, 'button', 'mainFilterBtnResetFilters', `Reset filters`);
  resetFilters.addEventListener('click', () => {
    window.history.pushState({}, "", '#'); // очищает url строку
    main(contentBox);
  })
  const copyLink = createElement(filterBtnRow, 'button', 'mainFilterBtnCopyLink', `Copy link`);
  copyLink.addEventListener('click', () => { // копирует URL
    const tempInput = document.createElement('textarea');
		tempInput.value = window.location.href;
		(copyLink as HTMLButtonElement).parentNode?.appendChild(tempInput);
		tempInput.select();
		document.execCommand('copy');
		(tempInput as HTMLTextAreaElement).parentNode?.removeChild(tempInput);
  })

  // фильтр категории --------------------------------------------------------------------------
  const mainFilterCategoryBox = createElement(mainFilterColum, 'div', 'mainFilterCategoryBox');
  const mainFilterCategoryTitle = createElement(mainFilterCategoryBox, 'div', 'mainFilterCategoryTitle', `Category`);
  const mainFilterCategoryList = createElement(mainFilterCategoryBox, 'div', 'mainFilterCategoryList');

  const categoryListObj = products.map((product) => product.category) // { категория : количество товара }
    .reduce((acc: Record<string, number>, el: string) => { acc[el] = (acc[el] || 0) + 1; return acc }, {});

  const stateCategoryListObj = state.map((product) => product.category) // { категория : количество товара }
    .reduce((acc: Record<string, number>, el: string) => { acc[el] = (acc[el] || 0) + 1; return acc }, {});

  for (const key in categoryListObj) {
    const categoryRow = createElement(mainFilterCategoryList, 'div', 'categoryRow');
    const categoryCheckbox = createElement(categoryRow, 'input', 'categoryCheckbox');
    (categoryCheckbox as HTMLInputElement).type = 'checkbox';
    (categoryCheckbox as HTMLInputElement).value = key;
    if (queryObj.category.includes((categoryCheckbox as HTMLInputElement).value)) {
      (categoryCheckbox as HTMLInputElement).checked = true; // делает активным выбранную фильтрацию
    }
    const categoryName = createElement(categoryRow, 'div', 'categoryName', `${key}`);
    const categoryCount = createElement(categoryRow, 'div', 'categoryCount', `${stateCategoryListObj[key] || 0}/${categoryListObj[key]}`);

    (categoryCheckbox as HTMLInputElement).addEventListener('change', e => { // слушатель события при изменение select
      if (!(e.target as HTMLInputElement).checked) delFromUrl('category', (e.target as HTMLSelectElement).value); // удаляет query из url
      else addToUrl('category', (e.target as HTMLSelectElement).value); // добавляет query в URL
      main(contentBox);
    })
  }

  // фильтр бренд -------------------------------------------------------------------------------
  const mainFilterBrandBox = createElement(mainFilterColum, 'div', 'mainFilterBrandBox');
  const brandTitle = createElement(mainFilterBrandBox, 'div', 'brandTitle', `Brand`);
  const brandList = createElement(mainFilterBrandBox, 'div', 'brandList');

  const brandListObj = products.map((product) => product.brand) // { бренд : количество товара }
    .reduce((acc: Record<string, number>, el: string) => { acc[el] = (acc[el] || 0) + 1; return acc }, {});

  const stateBrandListObj = state.map((product) => product.brand) // { бренд : количество товара }
    .reduce((acc: Record<string, number>, el: string) => { acc[el] = (acc[el] || 0) + 1; return acc }, {});

  for (const key in brandListObj) {
    const brandRow = createElement(brandList, 'div', 'brandRow');
    const brandCheckbox = createElement(brandRow, 'input', 'categoryCheckbox');
    (brandCheckbox as HTMLInputElement).type = 'checkbox';
    (brandCheckbox as HTMLInputElement).value = key;
    if (queryObj.brand.includes((brandCheckbox as HTMLInputElement).value)) {
      (brandCheckbox as HTMLInputElement).checked = true; // делает активным выбранную фильтрацию
    }
    const brandName = createElement(brandRow, 'div', 'brandName', `${key}`);
    const brandCount = createElement(brandRow, 'div', 'brandCount', `${stateBrandListObj[key] || 0}/${brandListObj[key]}`);

    (brandCheckbox as HTMLInputElement).addEventListener('change', e => { // слушатель события при изменение select
      if (!(e.target as HTMLInputElement).checked) delFromUrl('brand', (e.target as HTMLSelectElement).value); // удаляет query из url
      else addToUrl('brand', (e.target as HTMLSelectElement).value); // добавляет query в URL
      main(contentBox);
    })
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
  const sortCardOption0 = createElement(sortCardSelect, 'option', 'sortCardOption', 'Sort options:'); //по умолчанию
  (sortCardOption0 as HTMLSelectElement).disabled = true;
  const sortCardOption1 = createElement(sortCardSelect, 'option', 'sortCardOption', 'Sort by price ↑');
  sortCardOption1.setAttribute('value', 'priceup');
  const sortCardOption2 = createElement(sortCardSelect, 'option', 'sortCardOption', 'Sort by price ↓');
  sortCardOption2.setAttribute('value', 'pricedown');
  const sortCardOption3 = createElement(sortCardSelect, 'option', 'sortCardOption', 'Sort by rating ↑');
  sortCardOption3.setAttribute('value', 'ratingup');
  const sortCardOption4 = createElement(sortCardSelect, 'option', 'sortCardOption', 'Sort by rating ↓');
  sortCardOption4.setAttribute('value', 'ratingdown');
  sortCardSelect.addEventListener('change', e => { // слушатель события при изменение select
    addToUrl('sort', (e.target as HTMLSelectElement).value); // добавляет query category в URL
    main(contentBox); // отрисовка карточек товара
  })
  if (queryObj.sort.length > 0) (sortCardSelect as HTMLSelectElement).value = queryObj.sort[0]; // делает активным выбранную сортировку

  const foundCard = createElement(sortCardBox, 'div', 'sortCardSelect', `Found: ${state.length}`);

  const searchCard = createElement(sortCardBox, 'input', 'searchCard');
  (searchCard as HTMLInputElement).type = 'search';
  (searchCard as HTMLInputElement).placeholder = 'Search product';

  // блок с карточками ----------------------------------------------------------------------
  const mainProductsCardBox = createElement(mainProductsColum, 'div', 'mainProductsCardBox');
  for (const product in state) {
    card(mainProductsCardBox, +product);
  }

  return main;
}

