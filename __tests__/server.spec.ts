import {get, Server} from 'http';
import {startServer} from '../src/server';

describe('main', () => {
  const port = 15523;
  const baseUrl = `http://localhost:${port}`;
  let server: Server;

  beforeEach(() => {
    try {
      server = startServer(port);
    } catch (error) {
      console.log(error, `can't start the server`);
    }
  });

  afterEach(() => {
    server.close(() => {
      console.log('server closed');
    });
  })

  it('GET /', done => {
    get(baseUrl, res => {
      expect(res.statusCode).toBe(200);
      done();
    });
  });

  // it('POST /commit', done => {
  // //   try {

  //   const req = request({host: 'localhost', port: port, method: 'POST', path: '/commit'}, res => {
  //       console.log('res!!', res);
  //       res.on('data', chunk => {
  //         console.log('chunk', chunk);
  //         expect(chunk).toBe('done');
  //         done();
  //       });
  //     });

  //     // console.log('req', req);

  //     req.write(JSON.stringify({
  //       "remoteRepo": "moshfeu/commit-bot-test",
  //       "token": "7cb950575b914d7c36a8de37d9db056671e92788",
  //       "commitMessage": "yet another commit",
  //       "files": [
  //         {
  //           "path": "folder1/folder2/file3.js",
  //           "content": "alert('blabla123')"
  //         },
  //         {
  //           "path": "folder1/folder3/file4.ts",
  //           "content": "import * as path from 'path';"
  //         }
  //       ]
  //     }));

  // //     console.log('req done');
  // //   } catch (error) {
  // //     console.log('error', error);
  // //   }

  //   // expect(1).toBe(1);
  //   // done();
  // });
});