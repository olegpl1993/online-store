import './buyNow.scss';
import { createElement } from '../createElement';
import { main } from '../main/main';
import { contentBox } from '../..';
import { clearCartState } from '../state';
import { header } from '../header/header';
import { headerBox } from '../..';
import visaImg from "../../images/visa.png";
import mastercardImg from "../../images/mastercard.png";
import americanExpressImg from "../../images/americanExpress.png";

export function buyNow(buyNowBox: HTMLElement) {
  while (buyNowBox.firstChild) buyNowBox.removeChild(buyNowBox.firstChild); // очищаем узел buyNowBox

  const validObj = {
    nameSurname: false,
    phoneNumber: false,
    deliveryAddress: false,
    eMail: false,
    cardNumber: false,
    validThru: false,
    cvvCode: false,
    updateCollor() {
      nameSurname.style.borderColor = this.nameSurname ? 'green' : 'red';
      phoneNumber.style.borderColor = this.phoneNumber ? 'green' : 'red';
      deliveryAddress.style.borderColor = this.deliveryAddress ? 'green' : 'red';
      eMail.style.borderColor = this.eMail ? 'green' : 'red';
      cardNumber.style.borderColor = this.cardNumber ? 'green' : 'red';
      validThru.style.borderColor = this.validThru ? 'green' : 'red';
      cvvCode.style.borderColor = this.cvvCode ? 'green' : 'red';
      confirmBtn.style.backgroundColor = Object.values(validObj).includes(false) ? 'red' : 'green';
    }
  }

  const buyNowWindow = createElement(buyNowBox, 'div', 'buyNow');
  buyNowWindow.addEventListener("click", e => e.stopPropagation()); //отменяет всплытие

  const personalDetails = createElement(buyNowWindow, 'div', 'personalDetails', `Personal details`);

  const nameSurname = createElement(buyNowWindow, 'input', 'nameSurname inputStr');
  (nameSurname as HTMLInputElement).type = 'text';
  (nameSurname as HTMLInputElement).placeholder = 'Name and surname';
  nameSurname.addEventListener('input', () => {
    validObj.nameSurname = (nameSurname as HTMLInputElement).value.match(/[a-zA-Z]{3,}(\s[a-zA-Z]{3,})+/) ? true : false;
    validObj.updateCollor();
  })

  const phoneNumber = createElement(buyNowWindow, 'input', 'phoneNumber inputStr');
  (phoneNumber as HTMLInputElement).type = 'text';
  (phoneNumber as HTMLInputElement).placeholder = 'Phone number';
  phoneNumber.addEventListener('input', () => {
    validObj.phoneNumber = (phoneNumber as HTMLInputElement).value.match(/^[+][0-9]{9,}$/) ? true : false;
    validObj.updateCollor();
  })

  const deliveryAddress = createElement(buyNowWindow, 'input', 'deliveryAddress inputStr');
  (deliveryAddress as HTMLInputElement).type = 'text';
  (deliveryAddress as HTMLInputElement).placeholder = 'Delivery address';
  deliveryAddress.addEventListener('input', () => {
    validObj.deliveryAddress = (deliveryAddress as HTMLInputElement).value.match(/[a-zA-Z]{5,}\s[a-zA-Z]{5,}(\s[a-zA-Z]{5,})+/) ? true : false;
    validObj.updateCollor();
  })

  const eMail = createElement(buyNowWindow, 'input', 'eMail inputStr');
  (eMail as HTMLInputElement).type = 'text';
  (eMail as HTMLInputElement).placeholder = 'E-mail';
  eMail.addEventListener('input', () => {
    validObj.eMail = (eMail as HTMLInputElement).value.match(/\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/) ? true : false;
    validObj.updateCollor();
  })

  const creditCardDetails = createElement(buyNowWindow, 'div', 'creditCardDetails', `Credit card details`);

  const cardData = createElement(buyNowWindow, 'div', 'cardData');

  const cardRow = createElement(cardData, 'div', 'cardRow');

  const cardImg = createElement(cardRow, 'div', 'cardImg');
  cardImg.style.background = `white`;


  const cardNumber = createElement(cardRow, 'input', 'cardNumber inputStr');
  (cardNumber as HTMLInputElement).type = 'text';
  (cardNumber as HTMLInputElement).placeholder = 'Card number';
  cardNumber.addEventListener('input', () => {
    validObj.cardNumber = (cardNumber as HTMLInputElement).value.match(/^[0-9]{16}/) ? true : false;
    if ((cardNumber as HTMLInputElement).value.length > 16)
    (cardNumber as HTMLInputElement).value = (cardNumber as HTMLInputElement).value.slice(0, -1);
    if ((cardNumber as HTMLInputElement).value[0] === '3') cardImg.style.background = `url(${americanExpressImg})`;
    else if ((cardNumber as HTMLInputElement).value[0] === '4') cardImg.style.background = `url(${visaImg})`;
    else if ((cardNumber as HTMLInputElement).value[0] === '5') cardImg.style.background = `url(${mastercardImg})`;
    else cardImg.style.background = `white`;
    cardImg.style.backgroundPosition = 'center';
    cardImg.style.backgroundRepeat = 'no-repeat';
    cardImg.style.backgroundSize = 'contain';
    validObj.updateCollor();
  })

  const validCvvRow = createElement(cardData, 'div', 'validCvvRow');

  const validThru = createElement(validCvvRow, 'input', 'validThru inputStr');
  (validThru as HTMLInputElement).type = 'text';
  (validThru as HTMLInputElement).placeholder = 'Valid Thru';
  validThru.addEventListener('input', () => {
    validObj.validThru = (validThru as HTMLInputElement).value.match(/^[0-9]{2}\/[0-9]{2}/) ? true : false;
    if ((validThru as HTMLInputElement).value.length === 2 && +(validThru as HTMLInputElement).value <= 12) (validThru as HTMLInputElement).value += '/'
    if ((validThru as HTMLInputElement).value.length === 2 && +(validThru as HTMLInputElement).value >= 12) (validThru as HTMLInputElement).value = '';
    if ((validThru as HTMLInputElement).value.length > 5)
      (validThru as HTMLInputElement).value = (validThru as HTMLInputElement).value.slice(0, -1);
    validObj.updateCollor();
  })

  const cvvCode = createElement(validCvvRow, 'input', 'cvvCode inputStr');
  (cvvCode as HTMLInputElement).type = 'text';
  (cvvCode as HTMLInputElement).placeholder = 'CVV code';
  cvvCode.addEventListener('input', () => {
    validObj.cvvCode = (cvvCode as HTMLInputElement).value.match(/^[0-9]{3}/) ? true : false;
    if ((cvvCode as HTMLInputElement).value.length > 3)
      (cvvCode as HTMLInputElement).value = (cvvCode as HTMLInputElement).value.slice(0, -1);
    validObj.updateCollor();
  })

  const confirmBtn = createElement(buyNowWindow, 'button', 'confirmBtn', `CONFIRM`);
  confirmBtn.addEventListener('click', () => {
    if (!(Object.values(validObj).includes(false))) {
      while (buyNowBox.firstChild) buyNowBox.removeChild(buyNowBox.firstChild); // очищаем узел buyNowBox
      createElement(buyNowBox, 'div', 'successBox', `Order is processed`); // окно заказ обработан
      setTimeout(() => {  // задержка
        clearCartState(); // очистка корзины
        header(headerBox); // обновляет хедер
        main(contentBox); // переход на главную
      }, 3000);
    }
  })

  return buyNowWindow;
}