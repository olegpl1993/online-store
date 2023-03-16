import './error.scss'
import { createElement } from '../createElement'

export function error(contentBox: HTMLElement) {
  const error = createElement(contentBox, 'div', 'error', '404: page not found');
  return error;
}