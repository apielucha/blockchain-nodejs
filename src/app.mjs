// @flow

class App {
  host: string;
  port: number;

  constructor(port: number = 8080, host: string = 'localhost') {
    this.host = host;
    this.port = port;
  }

  async run(): Promise<string> {
    if (!this.host || !this.port) {
      throw new Error('App host or port not defined.');
    }

    return `http://${this.host}:${this.port}`;
  }
}

export default App;
