import Input from './input';
import { createAutoComplete } from '../auto-complete/index';
import dataLoader from './dataLoader';
import BaseComponent from './baseComponent';
import GenerateList from './generateList';

const header = new BaseComponent(document.body, 'header', 'header').append();
const h1 = new BaseComponent(header, 'h1', 'h1', 'Auto-Complete by Gorr2012').append();
const main = new BaseComponent(document.body, 'main', 'main').append();
const app = new BaseComponent(main, 'div', 'app').append();
const appWrapper = new BaseComponent(app, 'div', 'appWrapper').append();
const input = new Input(appWrapper, 'input', 'input').append();
const button = new BaseComponent(appWrapper, 'div', 'button', 'Show all').append();
const listWrapper = new BaseComponent(app, 'div', 'list-result').append();
const listItem = new GenerateList(listWrapper, 'div', 'list-item');
const footer = new BaseComponent(document.body, 'footer', 'footer').append();

const start = (): Promise<void> => dataLoader
  .makeRequest()
  .then((cities) => {
    const autoComplete = createAutoComplete(cities);
    let resultsArray: string[] = [];
    button.addEventListener('click', () => {
      listWrapper.classList.remove('active');
      listWrapper.classList.add('activeByclick');
      const str = input.value;
      resultsArray = autoComplete(str);
      listItem.showItems(resultsArray, resultsArray.length);
    });
    listWrapper.addEventListener('click', (e: Event & { target: HTMLElement }) => {
      input.value = e.target.innerHTML;
      listItem.showItems(autoComplete(input.value));
    });
    input.addEventListener('input', () => {
      listWrapper.classList.remove('activeByclick');
      listWrapper.classList.add('active');
      const str = input.value;
      resultsArray = autoComplete(str);
      listItem.showItems(resultsArray);
    });
    listWrapper.addEventListener('scroll', () => listItem.showItemsOnScroll(resultsArray));
  });

export default start;
