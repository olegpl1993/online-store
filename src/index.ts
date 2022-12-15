import './index.scss';
import { five } from './modules/hh';
import { createElement } from './modules/createElement';

const hi = 'Hell world ' + five;

const wrapper = createElement(document.body, 'div', 'wrapper');
const hello = createElement(wrapper, 'div', 'hello', hi);