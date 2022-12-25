import './cart.scss';
import { createElement } from '../createElement';
import { cartState } from '../state';
import { products } from '../state';


export function cart(contentBox: HTMLElement) {
  while (contentBox.firstChild) contentBox.removeChild(contentBox.firstChild); // очищаем узел contentBox

  const cartBox = createElement(contentBox, 'div', 'cart');
  const productsBox = createElement(cartBox, 'div', 'productsBox');
  const summaryBox = createElement(cartBox, 'div', 'summaryBox', 'summaryBox');

  // блок продуктов -----------------------------------------------------------------------
  const productsTopRow = createElement(productsBox, 'div', 'productsTopRow');
  const productsListTitle = createElement(productsTopRow, 'div', 'productsListTitle', 'Products In Cart');
  const productsListOption = createElement(productsTopRow, 'div', 'productsListOption');
  const optionItemsText = createElement(productsListOption, 'div', 'optionItemsText', 'ITEMS:');
  const optionItemsInput = createElement(productsListOption, 'input', 'optionItemsInput');
  const optionPageText = createElement(productsListOption, 'div', 'optionPageText', 'PAGE:');
  const optionPageBackBtn = createElement(productsListOption, 'button', 'optionPageBackBtn', '<');
  const optionPageNumber = createElement(productsListOption, 'div', 'optionPageNumber', '1');
  const optionPageNextBtn = createElement(productsListOption, 'button', 'optionPageNextBtn', '>');

  // список товаров -------------------------------------------------------------------------
  const cartStateObj = cartState.map((product) => product.id) // { ID товара : количество товара }
    .reduce((acc: any, el: number) => { acc[el] = (acc[el] || 0) + 1; return acc }, {}); // TODO (типизировать ANY)

  const productsList = createElement(productsBox, 'div', 'productsList');
  let i = 1; // начальная строка товара
  for (const id in cartStateObj) {
    const productRow = createElement(productsList, 'div', 'productRow');

    const numberRow = createElement(productRow, 'div', 'numberRow', `${i++}`);
    const productImg = createElement(productRow, 'img', 'productImg');
    (productImg as HTMLImageElement).src = products[+id - 1].thumbnail;

    const descriptionColum = createElement(productRow, 'div', 'descriptionColum');
    createElement(descriptionColum, 'div', 'productTitle', `${products[+id - 1].title}`);
    createElement(descriptionColum, 'div', 'descriptionText', `Category: ${products[+id - 1].category}`);
    createElement(descriptionColum, 'div', 'descriptionText', `Brand: ${products[+id - 1].brand}`);
    createElement(descriptionColum, 'div', 'descriptionText', `Discount Percentage: ${products[+id - 1].discountPercentage}`);
    createElement(descriptionColum, 'div', 'descriptionText', `Rating: ${products[+id - 1].rating}`);
    createElement(descriptionColum, 'div', 'descriptionText', `${products[+id - 1].description}`);

    const numberColum = createElement(productRow, 'div', 'numberColum'); // колонка регулировки количества товара
    const numberProductStock = createElement(numberColum, 'div', 'numberProductStock', `Stock: ${products[+id - 1].stock}`);
    const numberAddAwayRow = createElement(numberColum, 'div', 'numberAddAwayRow');

    const numberAddBtn = createElement(numberAddAwayRow, 'button', 'numberBtn', '+');
    numberAddBtn.addEventListener('click', () => { 
      cartState.push(products[+id - 1]);
      console.log(cartState);
      cart(contentBox);
    });

    const numberOfProducts = createElement(numberAddAwayRow, 'div', 'numberOfProducts', `${cartStateObj[id]}`);

    const numberAwayBtn = createElement(numberAddAwayRow, 'button', 'numberBtn', '-');
    numberAwayBtn.addEventListener('click', () => { 
      cartState.splice(cartState.indexOf(products[+id - 1]), 1);
      console.log(cartState);
      cart(contentBox);
    });

    const numberProductSumm = createElement(numberColum, 'div', 'numberProductSumm', `$${products[+id - 1].price * cartStateObj[id]}`);
  }


  // блок подсчета суммы ------------------------------------------------------------------


  return cart;
}