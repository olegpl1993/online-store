import './product.scss'
import { createElement } from '../createElement'
import data from '../../data/database.json'

export function product(contentBox: HTMLElement, id: number) {
  const products = data.products;

  const product = createElement(contentBox, 'div', 'product');
  const pathStr = `STORE >> ${products[id - 1].category} >> ${products[id - 1].brand} >> ${products[id - 1].title}`.toUpperCase();
  const path = createElement(product, 'div', 'path', pathStr);
  const productBox = createElement(product, 'div', 'productBox');
  const productTitle = createElement(productBox, 'div', 'productTitle', products[id - 1].title);

  const productBlock = createElement(productBox, 'div', 'productBlock');

  const productImgColum = createElement(productBlock, 'div', 'productImgColum');
  const productMiniImgColum = createElement(productImgColum, 'div', 'productMiniImgColum');
  for (let i = 0; i < (products[id - 1].images).length; i++) {
    const productMiniImg = createElement(productMiniImgColum, 'img', 'productMiniImg');
    (productMiniImg as HTMLImageElement).src = products[id - 1].images[i];
    (productMiniImg as HTMLImageElement).addEventListener('click', 
    event => (productBigImg as HTMLImageElement).src = ((event.target as HTMLImageElement).src))
  }
  const productBigImg = createElement(productImgColum, 'img', 'productBigImg');
  (productBigImg as HTMLImageElement).src = products[id - 1].images[1];

  const productDescriptionColum = createElement(productBlock, 'div', 'productDescriptionColum');
  const productDescriptionText1 = createElement(productDescriptionColum, 'div', 'productDescriptionText', `Description: ${products[id - 1].description}`);
  const productDescriptionText2 = createElement(productDescriptionColum, 'div', 'productDescriptionText', `Discount Percentage: ${products[id - 1].discountPercentage}`);
  const productDescriptionText3 = createElement(productDescriptionColum, 'div', 'productDescriptionText', `Rating: ${products[id - 1].rating}`);
  const productDescriptionText4 = createElement(productDescriptionColum, 'div', 'productDescriptionText', `Stock: ${products[id - 1].stock}`);
  const productDescriptionText5 = createElement(productDescriptionColum, 'div', 'productDescriptionText', `Brand: ${products[id - 1].brand}`);
  const productDescriptionText6 = createElement(productDescriptionColum, 'div', 'productDescriptionText', `Category: ${products[id - 1].category}`);

  const productDealColumn = createElement(productDescriptionColum, 'div', 'productDealColumn');
  const productPrice = createElement(productDealColumn, 'div', 'productPrice', `Price: $${products[id - 1].price}`);
  const productAddToCart = createElement(productDealColumn, 'button', 'productAddToCart', `ADD TO CART`);
  const productBuyNow = createElement(productDealColumn, 'button', 'productBuyNow', `BUY NOW`);

  return product;
}