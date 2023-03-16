import './footer.scss'
import { createElement } from '../createElement'

export function footer(footerBox: HTMLElement) {
  const footer = createElement(footerBox, 'div', 'footer');
  const rsSchool = createElement(footer, 'a', 'footerLink', 'RSSchool');
  (rsSchool as HTMLAnchorElement).href = 'https://rs.school/js/';
  const footerText = createElement(footer, 'div', 'footerText', 'Online Store 2022');
  const gitHub = createElement(footer, 'a', 'footerLink', 'GitHub');
  (gitHub as HTMLAnchorElement).href = 'https://github.com/olegpl1993';
  const gitHub1 = createElement(footer, 'a', 'footerLink', 'GitHub');
  (gitHub1 as HTMLAnchorElement).href = 'https://github.com/vladboisa';
  return footer;
}