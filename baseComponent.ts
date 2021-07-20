class BaseComponent {
  parentNode: HTMLElement;

  tagName: string;

  className: string;

  content: string;

  elemNode: HTMLElement;

  constructor(parentNode: HTMLElement, tagName = 'div', className = '', content = '') {
    this.parentNode = parentNode;
    this.tagName = tagName;
    this.className = className;
    this.content = content;
  }

  append = (): HTMLElement => {
    const el = document.createElement(this.tagName);
    el.className = this.className;
    el.innerHTML = this.content;
    this.parentNode.appendChild(el);
    return el;
  };
}

export default BaseComponent;
