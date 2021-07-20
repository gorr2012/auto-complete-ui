import BaseComponent from './baseComponent';

class GenerateList extends BaseComponent {
  elemNode: HTMLElement;

  counter: number;

  constructor(parentNode: HTMLElement, tagName = 'div', className = '', content = '') {
    super(parentNode, tagName, className, content);
    this.counter = 0;
  }

  loadMoreItems = (items: string[], NUMBER_OF_ITEMS_TO_SHOW = 20): void => {
    for (let i = 0; i < NUMBER_OF_ITEMS_TO_SHOW; i++) {
      if (items[this.counter] !== undefined) {
        const listItem = new BaseComponent(this.parentNode, 'div', 'list-item', `${items[this.counter]}`);
        listItem.append();
      }
      this.counter++;
    }
  };

  showItems = (items: string[], NUMBER_OF_ITEMS_TO_SHOW = 20): void => {
    this.counter = 0;
    this.parentNode.innerHTML = '';
    this.loadMoreItems(items, NUMBER_OF_ITEMS_TO_SHOW);
  };

  showItemsOnScroll = (items: string[], NUMBER_OF_ITEMS_TO_SHOW = 20): void => {
    if (this.parentNode.scrollTop + this.parentNode.clientHeight >= this.parentNode.scrollHeight) {
      this.loadMoreItems(items, NUMBER_OF_ITEMS_TO_SHOW);
    }
  };
}

export default GenerateList;
