import Server from './server';

class DataLoader extends Server {
  constructor() {
    super('https://raw.githubusercontent.com/Shastel/autocomplete-tests/master/cities.json');
  }
}

const dataLoader = new DataLoader();

export default dataLoader;
