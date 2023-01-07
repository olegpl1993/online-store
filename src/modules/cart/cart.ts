import './cart.scss';
import { createElement } from '../createElement';
import { cartState } from '../state';
import { products } from '../state';
import { header } from '../header/header';
import { headerBox } from '../..';
import { arrActivPromoCods } from '../state';
import { arrPromoCods } from '../state';
import { cartPages } from '../state';
import { buyNow } from '../buyNow/buyNow';

export function cart(contentBox: HTMLElement, buyNowDraw?: boolean) {
  while (contentBox.firstChild) contentBox.removeChild(contentBox.firstChild); // очищаем узел contentBox

  header(headerBox); // обновление хедера

  const cartStateObj = cartState.map((product) => product.id) // { ID товара : количество товара }
    .reduce((acc: Record<number, number>, el: number) => { acc[el] = (acc[el] || 0) + 1; return acc }, {});

  cartPages.limitPages = Math.ceil(Object.keys(cartStateObj).length / cartPages.limitPrductsOnPage);

  if (Object.keys(cartStateObj).length === 0) { // если корзина пустая
    const cartBox = createElement(contentBox, 'div', 'cart', 'Cart is Empty');
    return cartBox;
  }

  const cartBox = createElement(contentBox, 'div', 'cart');
  const productsBox = createElement(cartBox, 'div', 'productsBox');
  const summaryBox = createElement(cartBox, 'div', 'summaryBox');

  // модальное окно покупки --------------------------------------------------------------
  if (buyNowDraw === true) {
    const buyNowBox = createElement(cartBox, 'div', 'buyNowBox'); //обертка (черный фон)
    buyNow(buyNowBox);
    buyNowBox.addEventListener('click', () => cart(contentBox)); //закрытие модального окна при нажатии по обертке
  }

  // блок продуктов -----------------------------------------------------------------------
  const productsTopRow = createElement(productsBox, 'div', 'productsTopRow');
  const productsListTitle = createElement(productsTopRow, 'div', 'productsListTitle', 'Products In Cart');
  const productsListOption = createElement(productsTopRow, 'div', 'productsListOption');
  const optionItemsText = createElement(productsListOption, 'div', 'optionItemsText', 'LIMIT:');
  const optionItemsInput = createElement(productsListOption, 'input', 'optionItemsInput');
  const optionPageText = createElement(productsListOption, 'div', 'optionPageText', 'PAGE:');
  const optionPageBackBtn = createElement(productsListOption, 'button', 'optionPageBackBtn', '<');
  const optionPageNumber = createElement(productsListOption, 'div', 'optionPageNumber', cartPages.curentPage);
  const optionPageNextBtn = createElement(productsListOption, 'button', 'optionPageNextBtn', '>');

  (optionItemsInput as HTMLInputElement).type = 'number';
  (optionItemsInput as HTMLInputElement).min = '1';
  (optionItemsInput as HTMLInputElement).max = `${Object.keys(cartStateObj).length}`;
  (optionItemsInput as HTMLInputElement).value = `${cartPages.limitPrductsOnPage}`;
  (optionItemsInput as HTMLInputElement).addEventListener('input', () => {
    cartPages.limitPrductsOnPage = Number((optionItemsInput as HTMLInputElement).value);
    cart(contentBox);
  })

  optionPageBackBtn.addEventListener('click', () => {
    if (cartPages.curentPage > 1) {
      cartPages.curentPage--;
      cart(contentBox);
    }
  })
  optionPageNextBtn.addEventListener('click', () => {
    if (cartPages.curentPage < cartPages.limitPages) {
      cartPages.curentPage++;
      cart(contentBox);
    }
  })

  // рендер списка товаров -------------------------------------------------------------------------
  const productsList = createElement(productsBox, 'div', 'productsList');
  let i = 1; // начальная строка товара
  for (const id in cartStateObj) {
    const productItem = products[+id - 1];
    if (i <= cartPages.limitPrductsOnPage * cartPages.curentPage && i > cartPages.limitPrductsOnPage * (cartPages.curentPage - 1)) {
      const productRow = createElement(productsList, 'div', 'productRow');

      const numberRow = createElement(productRow, 'div', 'numberRow', `${i}`);
      const productImgBox = createElement(productRow, 'div', 'productImgBox');
      const productImg = createElement(productImgBox, 'img', 'productImg');
      (productImg as HTMLImageElement).src = productItem.thumbnail;

      const descriptionColum = createElement(productRow, 'div', 'descriptionColum');
      createElement(descriptionColum, 'div', 'productTitle', `${productItem.title}`);
      createElement(descriptionColum, 'div', 'descriptionText', `Category: ${productItem.category}`);
      createElement(descriptionColum, 'div', 'descriptionText', `Brand: ${productItem.brand}`);
      createElement(descriptionColum, 'div', 'descriptionText', `Discount Percentage: ${productItem.discountPercentage}`);
      createElement(descriptionColum, 'div', 'descriptionText', `Rating: ${productItem.rating}`);
      createElement(descriptionColum, 'div', 'descriptionText', `${productItem.description}`);

      const numberColum = createElement(productRow, 'div', 'numberColum'); // колонка регулировки количества товара
      const numberProductStock = createElement(numberColum, 'div', 'numberProductStock', `Stock: ${productItem.stock}`);
      const numberAddAwayRow = createElement(numberColum, 'div', 'numberAddAwayRow');

      const numberAddBtn = createElement(numberAddAwayRow, 'button', 'numberBtn', '+');
      numberAddBtn.addEventListener('click', () => {
        if (cartStateObj[+id] < productItem.stock) cartState.push(productItem);
        console.log(productItem)
        console.log(cartState)
        header(headerBox);
        cart(contentBox);
      })
      const numberOfProducts = createElement(numberAddAwayRow, 'div', 'numberOfProducts', `${cartStateObj[+id]}`);
      const numberAwayBtn = createElement(numberAddAwayRow, 'button', 'numberBtn', '-');
      numberAwayBtn.addEventListener('click', () => {
        cartState.splice(cartState.findIndex((product) => productItem.id === product.id), 1); // удаляет товар из корзины
        header(headerBox);
        cart(contentBox);
      })
      const numberProductSumm = createElement(numberColum, 'div', 'numberProductSumm', `$${productItem.price * cartStateObj[+id]}`);
    } else {
      if (cartPages.curentPage > cartPages.limitPages) {
        cartPages.curentPage = cartPages.limitPages;
        cart(contentBox);
      }
    }
    i++;
  }

  // блок подсчета суммы ------------------------------------------------------------------
  const summaryTopRow = createElement(summaryBox, 'div', 'summaryTopRow', 'Summary');
  const summaryProducts = createElement(summaryBox, 'div', 'summaryProducts', `Products: ${cartState.length}`);
  const totalSum = cartState.reduce((acc, val) => acc + val.price, 0); // сумма всех товаров в корзине
  const summaryTotal = createElement(summaryBox, 'div', 'summaryTotal', `Total: $${totalSum}`);

  const finalTotalSum = totalSum - (totalSum / 100 * 10 * arrActivPromoCods.length); // сумма с учетом промо кодов

  if (arrActivPromoCods.length > 0) { // если есть активированные промо коды
    const summaryNewTotal = createElement(summaryBox, 'div', 'summaryNewTotal', `New total: $${finalTotalSum}`);
    summaryTotal.style.textDecoration = 'line-through'; // перечеркивает сумму до скидки
    arrActivPromoCods.forEach((code) => {
      const appliedCodes = createElement(summaryBox, 'button', 'appliedCodes', `${code} -10% DROP`);
      (appliedCodes as HTMLButtonElement).value = code;
      appliedCodes.addEventListener('click', () => {
        const delIndex = arrActivPromoCods.indexOf((appliedCodes as HTMLButtonElement).value);
        arrActivPromoCods.splice(delIndex, 1); // удаляет промо код из массива
        cart(contentBox);
      })
    })
  }

  // блок с вводом промо кода --------------------------------------------------------------------
  const symmaryInputPromo = createElement(summaryBox, 'input', 'symmaryInputPromo');
  const symmaryBtnBox = createElement(summaryBox, 'div', 'symmaryPromoCodeBox'); // ячейка для кнопки
  (symmaryInputPromo as HTMLInputElement).type = 'text';
  (symmaryInputPromo as HTMLInputElement).placeholder = 'Enter promo code';

  symmaryInputPromo.addEventListener('input', () => {
    const inputText = ((symmaryInputPromo as HTMLInputElement).value).toUpperCase();
    if (arrPromoCods.includes(inputText) && !(arrActivPromoCods.includes(inputText))) {
      const symmaryPromoRsBtn = createElement(symmaryBtnBox, 'button', 'symmaryPromoBtn', `${inputText} -10% ADD`); // появляется кнопка
      symmaryPromoRsBtn.addEventListener('click', () => {
        arrActivPromoCods.push(inputText);
        cart(contentBox);
      })
    } else {
      while (symmaryBtnBox.firstChild) symmaryBtnBox.removeChild(symmaryBtnBox.firstChild); // прячет кнопку
    }
  })
  const promoForTest = createElement(summaryBox, 'div', 'promoForTest', `Promo for test: 'RS', 'EPM'`);

  // блок покупки -----------------------------------------------------------------------------
  const buyNowBtn = createElement(summaryBox, 'button', 'buyNowBtn', `BUY NOW`);
  buyNowBtn.addEventListener('click', () => {
    cart(contentBox, true);
  })
  // -----------------------------------------------------------------------------------------

  return cart;
}
