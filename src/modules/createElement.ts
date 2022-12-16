export function createElement(parent: HTMLElement, tag: string, className?: string, content?: string) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (content) element.textContent = content;
  parent.append(element);
  return element;
}
