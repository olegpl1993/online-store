import './card.scss'
import { createElement } from '../createElement'
import dataBase from '../../data/database.json'
import { route } from '../..';

export function card(contentBox: HTMLElement, id: number) {
  const productItem = dataBase.products[id];

  const card = createElement(contentBox, 'div', 'card');
  card.style.backgroundImage = `url('${productItem.thumbnail}')`;
  card.style.backgroundRepeat = 'no-repeat';
  card.style.backgroundSize = 'cover';

  const cardWrapper = createElement(card, 'div', 'cardWrapper');
  const cardTitle = createElement(cardWrapper, 'div', 'cardTitle', `${productItem.title}`);
  const cardDescription = createElement(cardWrapper, 'div', 'cardTitle')
  cardDescription.innerHTML += `
  <div>Category: ${productItem.category}</div>
  <div>Brand: ${productItem.brand}</div>
  <div>Price: $${productItem.price}</div>
  <div>Dicount: ${productItem.discountPercentage}%</div>
  <div>Rating: ${productItem.rating}</div>
  <div>Stock: ${productItem.stock}</div>
  `;
    const buttonRow = createElement(cardWrapper, 'div', 'buttonRow');
    const details = createElement(buttonRow, 'a', 'details', 'DETAILS');
    (details as HTMLAnchorElement).href = `#product/${productItem.id}`;
    details.addEventListener('click', (event) => route(event));
    
    const addToCart = createElement(buttonRow, 'button', 'addToCart', 'ADD TO CART');
    details.addEventListener('click', (event) => route(event));

  return card;
}