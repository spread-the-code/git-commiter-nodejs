import {get, Server} from 'http';
import {startServer} from '../src/server';

describe('main', () => {
  const port = 15523;
  const baseUrl = `http://localhost:${port}`;
  let server: Server;

  beforeAll(() => {
    server = startServer(port);
  });

  afterAll(() => {
    server.close();
  })

  it('/', done => {
    get(baseUrl, res => {
      expect(res.statusCode).toBe(200);
      done();
    });
  });
});