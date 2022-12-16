import './card.scss'
import { createElement } from '../createElement'

export function card(contentBox: HTMLElement) {
  const card = createElement(contentBox, 'div', 'card', 'Card Page')
  return card;
}