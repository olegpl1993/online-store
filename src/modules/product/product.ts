import './product.scss'
import { createElement } from '../createElement'
import { products } from '../state'

export function product(contentBox: HTMLElement, id: number) {
  const product = createElement(contentBox, 'div', 'product');
  console.log(products[id - 1]);
  const pathStr = `STORE >> ${products[id - 1].category} >> ${products[id - 1].brand} >> ${products[id - 1].title}`.toUpperCase();
  const path = createElement(product, 'div', 'path', pathStr);
  const productBox = createElement(product, 'div', 'productBox');
  const productTitle = createElement(productBox, 'div', 'productTitle', products[id - 1].title);
  const productBlock = createElement(productBox, 'div', 'productBlock');
  const productImgColum = createElement(productBlock, 'div', 'productImgColum');


  const descriptionStr =
    `Description: ${products[id - 1].description},
  Discount Percentage: ${products[id - 1].discountPercentage},
  Rating: ${products[id - 1].rating},
  Stock: ${products[id - 1].stock},
  `
  const productDescriptionColum = createElement(productBlock, 'div', 'productImgColum', descriptionStr);

  return product;
}