import './product.scss'
import { createElement } from '../createElement'

export function product(contentBox: HTMLElement) {
  const product = createElement(contentBox, 'div', 'product', 'Product Page')
  return product;
}