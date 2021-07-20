class Server {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  makeRequest = (): Promise<string[]> => fetch(this.url).then((response) => {
    if (response.status === 200) {
      return response.json();
    }
    return response.text().then((e) => {
      throw new Error(e);
    });
  });
}

export default Server;
