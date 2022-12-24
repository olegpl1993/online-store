import './cart.scss';
import { createElement } from '../createElement';
import { cartState } from '../state';
import { products } from '../state';


export function cart(contentBox: HTMLElement) {
  while (contentBox.firstChild) contentBox.removeChild(contentBox.firstChild); // очищаем узел contentBox

  const cart = createElement(contentBox, 'div', 'cart');
  const productsBox = createElement(cart, 'div', 'productsBox');
  const summaryBox = createElement(cart, 'div', 'summaryBox', 'summaryBox');

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

  const cartStateObj = cartState.map((product) => product.id) // { ID товара : количество товара }
    .reduce((acc: any, el: number) => { acc[el] = (acc[el] || 0) + 1; return acc }, {}); // TODO (типизировать ANY)
  console.log(cartState)
  console.log(cartStateObj)

  const productsList = createElement(productsBox, 'div', 'productsList');
  let i = 1; // начальная строка товара
  for (const id in cartStateObj) {
    const productRow = createElement(productsList, 'div', 'productRow');
    const numberRow = createElement(productRow, 'div', 'numberRow', `${i++}`);
    const productTitle = createElement(productRow, 'div', 'productTitle', `${products[+id - 1].title}`);
  }



  // блок подсчета суммы ------------------------------------------------------------------


  return cart;
}