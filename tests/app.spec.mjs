// @flow

import App from '../src/app';

describe('app.mjs', () => {
  describe('class App', () => {
    describe('constructor()', () => {
      it('should initialize with no parameters', () => {
        const { host, port }: App = new App();

        expect(host).toBe('localhost');
        expect(port).toBe(8080);
      });

      it('should initialize with only port parameter', () => {
        const { host, port }: App = new App(3000);

        expect(host).toBe('localhost');
        expect(port).toBe(3000);
      });

      it('should initialize with both parameters', () => {
        const { host, port }: App = new App(3000, '192.168.0.1');

        expect(host).toBe('192.168.0.1');
        expect(port).toBe(3000);
      });
    });

    describe('run()', () => {
      it('should return app URL', async () => {
        const app: App = new App();
        const url: string = await app.run();

        expect(url).toBe('http://localhost:8080');
      });

      it('should throw error if host or port not defined', async () => {
        const app: App = new App();
        // $FlowFixMe NOTE: test if port undefined
        app.port = undefined;

        await expect(app.run()).rejects.toThrowError(
          'App host or port not defined.',
        );
      });
    });
  });
});
