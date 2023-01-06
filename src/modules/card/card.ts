import './card.scss'
import { createElement } from '../createElement'
import { state } from '../state';
import { route } from '../..';
import { cartState } from '../state';
import { header } from '../header/header';
import { headerBox } from '../..';
import { main } from '../main/main';
import { contentBox as mainContentBox } from '../..';
import { parseSearch } from '../functions';
import { saveQuery } from '../state';

export function card(contentBox: HTMLElement, id: number) {
  const productItem = state[id];
  const queryObj = parseSearch(); // получение query параметров

  // проверка что продукт есть в корзине
  const inCartArr: boolean[] = [];
  cartState.forEach(productInCart => { inCartArr.push(productInCart.id === productItem.id) });
  const inCart = inCartArr.includes(true);
  const cardBox = createElement(contentBox, 'div', `${queryObj.size[0] !== 'small' ? 'card' : 'smallCard'}`);

  if (inCart) cardBox.classList.add('_inCart');
  cardBox.style.backgroundImage = `url('${productItem.thumbnail}')`;
  cardBox.style.backgroundRepeat = 'no-repeat';
  cardBox.style.backgroundSize = 'cover';

  const cardWrapper = createElement(cardBox, 'div', 'cardWrapper');
  const cardTitle = createElement(cardWrapper, 'div', 'cardTitle', `${productItem.title}`);
  if (queryObj.size[0] !== 'small') {
    const cardDescription = createElement(cardWrapper, 'div', 'cardDescription');
    cardDescription.innerHTML += `
    <div>Category: ${productItem.category}</div>
    <div>Brand: ${productItem.brand}</div>
    <div>Price: $${productItem.price}</div>
    <div>Dicount: ${productItem.discountPercentage}%</div>
    <div>Rating: ${productItem.rating}</div>
    <div>Stock: ${productItem.stock}</div> `;
  } else {
    const cardDescriptionPrice = createElement(cardWrapper, 'div', 'cardDescriptionPrice', `Price: $${productItem.price}`);
  }

  const buttonRow = createElement(cardWrapper, 'div', 'buttonRow');
  const details = createElement(buttonRow, 'a', 'details', 'DETAILS');
  (details as HTMLAnchorElement).href = `#product/${productItem.id}`;
  details.addEventListener('click', (event) => {
    saveQuery(); // сохраняет query параметры
    route(event);
  });
  if (inCart) {
    const removeProduct = createElement(buttonRow, 'button', 'addToCart', 'REMOVE');
    removeProduct.addEventListener('click', () => {
      cartState.splice(cartState.indexOf(productItem), 1); // удаляет товар из корзины
      header(headerBox); // повторная отрисовка хедера
      main(mainContentBox); // повторная отрисовка main
    });
  } else {
    const addToCart = createElement(buttonRow, 'button', 'addToCart', 'ADD TO CART');
    addToCart.addEventListener('click', () => {
      cartState.push(productItem); // добавляет товар в корзину
      header(headerBox); // повторная отрисовка хедера
      main(mainContentBox); // повторная отрисовка main
    });
  }

  return card;
}