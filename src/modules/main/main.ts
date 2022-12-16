import './main.scss'
import { createElement } from '../createElement'

export function main(contentBox: HTMLElement) {
  const main = createElement(contentBox, 'div', 'main', 'Main Page')
  return main;
}