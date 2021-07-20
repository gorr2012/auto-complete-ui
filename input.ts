import BaseComponent from './baseComponent';

class Input extends BaseComponent {
  placeholder: string;

  constructor(parentNode: HTMLElement, tagName = 'input', className = '', placeholder = 'Type something here!') {
    super(parentNode, tagName, className);
    this.placeholder = placeholder;
  }

  append = (): HTMLInputElement => {
    const el = document.createElement(this.tagName);
    el.className = this.className;
    el.innerHTML = this.content;
    this.parentNode.appendChild(el);
    return (el as HTMLInputElement);
  };
}

export default Input;
