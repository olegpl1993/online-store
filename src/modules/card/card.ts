import './card.scss'
import { createElement } from '../createElement'
import dataBase from '../../data/database.json'

export function card(contentBox: HTMLElement,idProduct:number) {
  const productItem = dataBase.products[idProduct];
  const card = createElement(contentBox, 'h2', 'card-title')
  const cardWrap = createElement(contentBox,'div','card')
  cardWrap.innerHTML = `
  <div class="photo">
    <img src="${productItem.thumbnail}" alt="The image of ${productItem.title} width="220" height="220">
    <div class="photo-album">
      <ul>
        <li><img src="${productItem.images[0]}" alt="The image of ${productItem.title}" width="57" height="57" loading="lazy"></li>
        <li><img src="${productItem.images[1]}" alt="The image of ${productItem.title}" width="57" height="57" loading="lazy"></li>
        <li><img src="${productItem.images[2]}" alt="The image of ${productItem.title}" width="57" height="57" loading="lazy"></li>
        <li><img src="${productItem.images[3]}" alt="The image of ${productItem.title}" width="57" height="57" loading="lazy"></li>
      </ul>
    </div>
  </div>
  <div class="description">
    <h3 class="description-title">${productItem.title}</h3>
    <h5 class="description-category">${productItem.category}</h5>
    <h5 class="description-brand">${productItem.brand}</h5>
    <span class="description-price">$ ${productItem.price}</span>
    <p class="description-text">${productItem.description}</p>
    <button class="description-button">Add to Cart</button>
  </div>
`
  return card;
}