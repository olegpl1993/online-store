export function createElement(parent: HTMLElement, tag: string, className?: string, content?: string | number) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (content) element.textContent = String(content);
  parent.append(element);
  return element;
}
