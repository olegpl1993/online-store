import './cart.scss'
import { createElement } from '../createElement'

export function cart(contentBox: HTMLElement) {
  const cart = createElement(contentBox, 'div', 'cart', 'Cart Page')
  return cart;
}