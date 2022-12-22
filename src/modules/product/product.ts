import './product.scss'
import { createElement } from '../createElement'
import { products } from '../state';
import { cartState } from '../state';
import { header } from '../header/header';
import { headerBox } from '../..';

export function product(contentBox: HTMLElement, id: number) {
  const productItem = products[id - 1];
  
  const product = createElement(contentBox, 'div', 'product');
  const pathStr = `STORE >> ${productItem.category} >> ${productItem.brand} >> ${productItem.title}`.toUpperCase();
  const path = createElement(product, 'div', 'path', pathStr);
  const productBox = createElement(product, 'div', 'productBox');
  const productTitle = createElement(productBox, 'div', 'productTitle', productItem.title);

  const productBlock = createElement(productBox, 'div', 'productBlock');

  const productImgColum = createElement(productBlock, 'div', 'productImgColum');
  const productMiniImgColum = createElement(productImgColum, 'div', 'productMiniImgColum');
  for (let i = 0; i < (productItem.images).length; i++) {
    const productMiniImg = createElement(productMiniImgColum, 'img', 'productMiniImg');
    (productMiniImg as HTMLImageElement).src = productItem.images[i];
    (productMiniImg as HTMLImageElement).addEventListener('click', 
    event => (productBigImg as HTMLImageElement).src = ((event.target as HTMLImageElement).src))
  }
  const productBigImg = createElement(productImgColum, 'img', 'productBigImg');
  (productBigImg as HTMLImageElement).src = productItem.images[1];

  const productDescriptionColum = createElement(productBlock, 'div', 'productDescriptionColum');
  const productDescriptionText1 = createElement(productDescriptionColum, 'div', 'productDescriptionText', `Description: ${productItem.description}`);
  const productDescriptionText2 = createElement(productDescriptionColum, 'div', 'productDescriptionText', `Discount Percentage: ${productItem.discountPercentage}`);
  const productDescriptionText3 = createElement(productDescriptionColum, 'div', 'productDescriptionText', `Rating: ${productItem.rating}`);
  const productDescriptionText4 = createElement(productDescriptionColum, 'div', 'productDescriptionText', `Stock: ${productItem.stock}`);
  const productDescriptionText5 = createElement(productDescriptionColum, 'div', 'productDescriptionText', `Brand: ${productItem.brand}`);
  const productDescriptionText6 = createElement(productDescriptionColum, 'div', 'productDescriptionText', `Category: ${productItem.category}`);

  const productDealColumn = createElement(productDescriptionColum, 'div', 'productDealColumn');
  const productPrice = createElement(productDealColumn, 'div', 'productPrice', `Price: $${productItem.price}`);
  const productAddToCart = createElement(productDealColumn, 'button', 'productAddToCart', `ADD TO CART`);
  productAddToCart.addEventListener('click', () => {
    cartState.push(productItem); // добавляет товар в корзину
    header(headerBox); // повторная отрисовка хедера
  });
  const productBuyNow = createElement(productDealColumn, 'button', 'productBuyNow', `BUY NOW`);

  return product;
}