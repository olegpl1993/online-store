import './product.scss'
import { createElement } from '../createElement'
import { products } from '../state';
import { cartState } from '../state';
import { header } from '../header/header';
import { headerBox } from '../..';
import { cart } from '../cart/cart';

export function product(contentBox: HTMLElement, id: number) {
  while (contentBox.firstChild) contentBox.removeChild(contentBox.firstChild); // очищаем узел contentBox

  header(headerBox); // обновление хедера

  const productItem = products[id - 1]; // обьект продукта
  if (!productItem) return createElement(contentBox, 'div', 'product', `Product ${id} not found`); // если введен не коректный номер продукта

  // проверка что продукт есть в корзине
  const inCartArr: boolean[] = [];
  cartState.forEach(productInCart => { inCartArr.push(productInCart.id === productItem.id) });
  const inCart = inCartArr.includes(true);

  const pathStr = `STORE >> ${productItem.category} >> ${productItem.brand} >> ${productItem.title}`.toUpperCase();
  const productBox = createElement(contentBox, 'div', 'product');
  const productPatch = createElement(productBox, 'div', 'productPatch', pathStr);

  const cardWrap = createElement(productBox, 'div', 'card-item')
  cardWrap.innerHTML = `
  <div class="photo">
  <img src="${productItem.thumbnail}" alt="The image of ${productItem.title} loading = "lazy" width="220" height="220">
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
    <button class="description-button addRemoveBtn">${inCart ? 'Remove' : 'Add to Cart'}</button>
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
      img.loading = 'lazy';
      photoListItem.appendChild(img);
      (img as HTMLImageElement).addEventListener('click',
        event => (photoThumb as HTMLImageElement).src = ((event.target as HTMLImageElement).src));
    });
  }

  const addRemoveBtn = document.querySelector('.addRemoveBtn');
  if (inCart) {
    addRemoveBtn?.addEventListener('click', () => {
      cartState.splice(cartState.findIndex((product) => productItem.id === product.id), 1); // удаляет товар из корзины
      header(headerBox); // повторная отрисовка хедера
      product(contentBox, id);
    });
  } else {
    addRemoveBtn?.addEventListener('click', () => {
      cartState.push(productItem); // добавляет товар в корзину
      header(headerBox); // повторная отрисовка хедера
      product(contentBox, id);
    });
  }

  const buyNowBtn = document.querySelector('.buyNowBtn');
  buyNowBtn?.addEventListener('click', () => {
    if (!cartState.includes(productItem)) cartState.push(productItem); // если товара нету добавляет товар в корзину
    header(headerBox); // повторная отрисовка хедера
    cart(contentBox, true); // открывает корзину с модальным окном
  });

  return productBox;
}