import './main.scss'
import { createElement } from '../createElement'
import { card } from '../card/card';
import { products } from './../state';
import { state } from '../state';
import { parseSearch } from '../functions';
import { addToUrl } from '../functions';
import { delFromUrl } from '../functions';
import { updateState } from './../state';
import { clearQuery } from './../state';
import { header } from '../header/header';
import { headerBox } from '../..';

export function main(contentBox: HTMLElement) {
  while (contentBox.firstChild) contentBox.removeChild(contentBox.firstChild); // очищаем узел contentBox

  clearQuery(); // очищает сохраненые query параметры
  header(headerBox); // обновляет хедер
  const queryObj = parseSearch(); // получение query параметров в обьект

  if (queryObj.notCorrectQuery[0]) { // очищает фильтры если введен не коретный query ключ
    window.history.pushState({}, "", '#'); // очищает url строку
    main(contentBox); // рендер главной страницы
  }

  updateState(); // обновить фильтрацию и сортировку state

  const mainBox = createElement(contentBox, 'div', 'main');
  const mainFilterColum = createElement(mainBox, 'div', 'mainFilterColum');
  const mainProductsColum = createElement(mainBox, 'div', 'mainProductsColum');

  // кнопки очистить фильтры и копировать ссылку ---------------------------------------
  const filterBtnRow = createElement(mainFilterColum, 'div', 'mainFilterBtnRow');
  const openFilters = createElement(filterBtnRow, 'button', 'openFilters', `${queryObj.filterDisplay[0] ? 'Close filters' : 'Open filters'}`);
  openFilters.addEventListener('click', () => {
    if (queryObj.filterDisplay[0]) delFromUrl('filterDisplay', 'flex'); // удаляет query из url
    else addToUrl('filterDisplay', 'flex'); // добавляет query в URL
    main(contentBox);
  })
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
  if (queryObj.filterDisplay[0]) mainFilterCategoryBox.classList.add('_filterDisplay');
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
  if (queryObj.filterDisplay[0]) mainFilterBrandBox.classList.add('_filterDisplay');
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
  if (queryObj.filterDisplay[0]) priceBox.classList.add('_filterDisplay');
  const priceTitle = createElement(priceBox, 'div', 'priceTitle', `Price`);
  const fromToBox = createElement(priceBox, 'div', 'fromToBox');

  const priceArr: number[] = []; // массив цен на товары в state
  state.forEach(el => priceArr.push(el.price));
  const priceMin = Math.min(...priceArr);
  const priceMax = Math.max(...priceArr);

  const priceArrAllProducts: number[] = []; // массив цен на товары всех продуктов
  products.forEach(el => priceArrAllProducts.push(el.price));
  const priceMinAllProducts = Math.min(...priceArrAllProducts);
  const priceMaxAllProducts = Math.max(...priceArrAllProducts);

  const rangeRow = createElement(fromToBox, 'div', 'rangeRow');

  const range1 = createElement(rangeRow, 'input', 'range1');
  (range1 as HTMLInputElement).type = 'range';
  (range1 as HTMLInputElement).min = String(priceMinAllProducts);
  (range1 as HTMLInputElement).max = String(priceMaxAllProducts);
  (range1 as HTMLInputElement).value = queryObj.price[0] ? queryObj.price[0].split('/')[0] : String(priceMin);
  (range1 as HTMLInputElement).addEventListener('change', () => {
    const minInput = Math.min(Number((range1 as HTMLInputElement).value), Number((range2 as HTMLInputElement).value));
    const maxInput = Math.max(Number((range1 as HTMLInputElement).value), Number((range2 as HTMLInputElement).value));
    const priceStrToUrl = minInput === maxInput ? `${minInput}` : `${minInput}/${maxInput}`;
    addToUrl('price', priceStrToUrl);
    if (priceMinAllProducts === minInput && priceMaxAllProducts === maxInput) delFromUrl('price', priceStrToUrl);
    main(contentBox); // отрисовка карточек товара
  });
  (range1 as HTMLInputElement).addEventListener('input', () => {
    const minInput = Math.min(Number((range1 as HTMLInputElement).value), Number((range2 as HTMLInputElement).value));
    const maxInput = Math.max(Number((range1 as HTMLInputElement).value), Number((range2 as HTMLInputElement).value));
    (fromToRow as HTMLDivElement).textContent = minInput === maxInput ? `$${minInput}` : `$${minInput} ⟷ $${maxInput}`;
  });

  const range2 = createElement(rangeRow, 'input', 'range2');
  (range2 as HTMLInputElement).type = 'range';
  (range2 as HTMLInputElement).min = String(priceMinAllProducts);
  (range2 as HTMLInputElement).max = String(priceMaxAllProducts);
  (range2 as HTMLInputElement).value = queryObj.price[0] ? queryObj.price[0].split('/')[1] : String(priceMax);
  (range2 as HTMLInputElement).addEventListener('change', () => {
    const minInput = Math.min(Number((range1 as HTMLInputElement).value), Number((range2 as HTMLInputElement).value));
    const maxInput = Math.max(Number((range1 as HTMLInputElement).value), Number((range2 as HTMLInputElement).value));
    const priceStrToUrl = minInput === maxInput ? `${minInput}` : `${minInput}/${maxInput}`;
    addToUrl('price', priceStrToUrl);
    if (priceMinAllProducts === minInput && priceMaxAllProducts === maxInput) delFromUrl('price', priceStrToUrl);
    main(contentBox); // отрисовка карточек товара
  });
  (range2 as HTMLInputElement).addEventListener('input', () => {
    const minInput = Math.min(Number((range1 as HTMLInputElement).value), Number((range2 as HTMLInputElement).value));
    const maxInput = Math.max(Number((range1 as HTMLInputElement).value), Number((range2 as HTMLInputElement).value));
    (fromToRow as HTMLDivElement).textContent = minInput === maxInput ? `$${minInput}` : `$${minInput} ⟷ $${maxInput}`;
  });

  const minInput = Math.min(Number((range1 as HTMLInputElement).value), Number((range2 as HTMLInputElement).value));
  const maxInput = Math.max(Number((range1 as HTMLInputElement).value), Number((range2 as HTMLInputElement).value));
  const minMaxString = minInput === maxInput ? `$${minInput}` : `$${minInput} ⟷ $${maxInput}`;
  const fromToRow = createElement(fromToBox, 'div', 'fromToRow', minMaxString);

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
    addToUrl('sort', (e.target as HTMLSelectElement).value); // добавляет query в URL
    main(contentBox); // отрисовка карточек товара
  })
  if (queryObj.sort.length > 0) (sortCardSelect as HTMLSelectElement).value = queryObj.sort[0]; // делает активным выбранную сортировку

  const foundCard = createElement(sortCardBox, 'div', 'foundCard', `Found: ${state.length}`);

  const searchCard = createElement(sortCardBox, 'input', 'searchCard');
  (searchCard as HTMLInputElement).type = 'search';
  (searchCard as HTMLInputElement).placeholder = 'Search product';
  searchCard.addEventListener('input', e => { // слушатель события при вводе текста
    addToUrl('search', (e.target as HTMLSelectElement).value); // добавляет query в URL
    main(contentBox); // отрисовка карточек товара
  })
  if (queryObj.search.length > 0) { // если строка поиска не пустая
    (searchCard as HTMLInputElement).value = queryObj.search[0]; // заполняет строку
    (searchCard as HTMLInputElement).focus(); // ставит курсор
  }

  // кнопки изменения вида карточек ---------------------------------------------------------
  const sizeBtnRow = createElement(sortCardBox, 'div', 'sizeBtnRow');
  if (queryObj.size[0] === 'small') {
    const sizeBtn = createElement(sizeBtnRow, 'button', 'bigSizeBtn');
    for (let i = 0; i < 9; i++) createElement(sizeBtn, 'div', 'bigSizeBtnPoint');
    sizeBtn.addEventListener('click', () => { // слушатель события при изменение size
      addToUrl('size', 'big'); // добавляет query в URL
      main(contentBox); // отрисовка карточек товара
    })
  } else {
    const sizeBtn = createElement(sizeBtnRow, 'button', 'smallSizeBtn');
    for (let i = 0; i < 20; i++) createElement(sizeBtn, 'div', 'smallSizeBtnPoint');
    sizeBtn.addEventListener('click', () => { // слушатель события при изменение size
      addToUrl('size', 'small'); // добавляет query в URL
      main(contentBox); // отрисовка карточек товара
    })
  }

  // блок с карточками ----------------------------------------------------------------------
  const mainProductsCardBox = createElement(mainProductsColum, 'div', 'mainProductsCardBox');
  if (state.length === 0) createElement(mainProductsCardBox, 'div', 'noProductsFound', 'No products found');
  else for (const product in state) card(mainProductsCardBox, +product); // рендер карточек товара

  return mainBox;
}
