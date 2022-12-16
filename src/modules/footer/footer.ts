import './footer.scss'
import { createElement } from '../createElement'

export function footer(footerBox: HTMLElement) {
  const footer = createElement(footerBox, 'div', 'footer');
  const footerText = createElement(footer, 'div', 'footerText', 'Online Store 2022');
  return footer;
}