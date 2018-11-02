// tslint:disable-next-line:no-implicit-dependencies
import axios from 'axios';
// tslint:disable-next-line:no-submodule-imports
import * as simpleGit from 'simple-git/promise';
import {startServer} from '../src/server';

jest.mock('simple-git/promise');

describe('main', () => {
  let port;
  let baseUrl;
  let server;
  let sg;

  beforeEach(async () => {
    try {
      // tslint:disable
      port = 3000 + Math.ceil(Math.random() * 1000);
      // tslint:enable
      process.env.PORT = port;
      baseUrl = `http://localhost:${port}`;
      server = await startServer();
      sg = simpleGit();

      return server;
    } catch (error) {
      console.log(error, `can't start the server`);
    }
  });

  afterEach(async () => {
    server.close();
    sg._dispose();
  })

  // tslint:disable:mocha-unneeded-done
  it('GET /', async (done) => {
    const res = await axios(baseUrl);
    expect(res.status).toBe(200);
    expect(res.data).toBe('Hello World!');
    done();
  });

  describe('POST /commit', () => {
    // tslint:disable-next-line:mocha-unneeded-done
    it('complete payload', async (done) => {
      const res = await axios({
        url: `http://localhost:${port}/commit`,
        method: 'POST',
        data: payload
      });
      expect(res.status).toBe(200);
      expect(res.data).toBe('done');
      const gitStatus = await sg.status();
      expect(
        gitStatus.files.map(file => file.path)
      ).toEqual(
        payload.files.map(file => file.path)
      );
      done();
    });
  });

  it('not complete payload', async (done) => {
    const res = await axios({
      url: `http://localhost:${port}/commit`,
      method: 'POST',
      validateStatus: () => true
    });

    expect(res.status).toBe(500);
    done();
  });
});

const payload = {
  "remoteRepo": "moshfeu/commit-bot-test",
  "token": "7cb950575b914d7c36a8de37d9db056671e92788",
  "commitMessage": "yet another commit",
  "files": [
    {
      "path": "folder1/folder2/file3.js",
      "content": "alert('blabla123')"
    },
    {
      "path": "folder1/folder3/file4.ts",
      "content": "import * as path from 'path';"
    }
  ]
};