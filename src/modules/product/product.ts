import './product.scss'
import { createElement } from '../createElement'
import { products } from '../state';
import { cartState } from '../state';
import { header } from '../header/header';
import { headerBox } from '../..';
import { cart } from '../cart/cart';

export function product(contentBox: HTMLElement, id: number) {

  const productItem = products[id - 1];

  const pathStr = `STORE >> ${productItem.category} >> ${productItem.brand} >> ${productItem.title}`.toUpperCase();
  const product = createElement(contentBox, 'h2', 'product', pathStr);

  const cardWrap = createElement(contentBox, 'div', 'card-item')
  cardWrap.innerHTML = `
  <div class="photo">
  <img src="${productItem.thumbnail}" alt="The image of ${productItem.title} width="220" height="220">
  <div class="photo-album">
  <ul class="photo-list">
  </ul>
  </div>
  </div>
  <div class="description">
    <h3 class="description-title">${productItem.title}</h3>
    <h5 class="description-category">${productItem.category}</h5>
    <h5 class="description-brand">${productItem.brand}</h5>
    <p class="description-price">${productItem.price}</p>
    <p class="description-text">${productItem.description}</p>
    <button class="description-button">Add to Cart</button>
    <button class="description-button buyNowBtn">Buy now</button>
    <h5 class="description-discount">Discount percentage: ${productItem.discountPercentage}</h5>
    </div>
    `
  const photoList = document.querySelector('.photo-list');
  const photoThumb = document.querySelector('.photo img');
  if ((photoList != null) && (photoThumb != null)) { //если список изображений и главный постер существуют
    productItem.images.forEach((val) => { //для каждого изображения
      const photoListItem = createElement(photoList, 'li', ''); //создай элемент списка
      const img = createElement(photoListItem, 'img', '') as HTMLImageElement; //создай изображение
      img.alt = `The image of ${productItem.title}`;
      img.src = val;
      img.width = 57;
      img.height = 57;
      photoListItem.appendChild(img);
      (img as HTMLImageElement).addEventListener('click',
        event => (photoThumb as HTMLImageElement).src = ((event.target as HTMLImageElement).src));
    });
  }

  const productAddToCart = document.querySelector('.description-button');
  productAddToCart?.addEventListener('click', () => {
    cartState.push(productItem); // добавляет товар в корзину
    header(headerBox); // повторная отрисовка хедера
  });

  const buyNowBtn = document.querySelector('.buyNowBtn');
  buyNowBtn?.addEventListener('click', () => {
    cartState.push(productItem); // добавляет товар в корзину
    header(headerBox); // повторная отрисовка хедера
    cart(contentBox, true); // открывает корзину с модальным окном
  });

  return product;
}