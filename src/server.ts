import * as bodyParser from 'body-parser';
import * as express from 'express';
import { readdirSync } from 'fs';
import {Server} from 'http';
import {join} from 'path';
// tslint:disable-next-line:no-submodule-imports
import * as simpleGit from 'simple-git/promise';
import{directory} from 'tempy';
import {writeFileDeepSync} from './utils';

export function startServer(port = process.env.PORT || 3000): Server {
  const app = express();

  app.use(bodyParser.json());

  app.get('/', (_req, res) => res.send('Hello World!'))

  app.post('/commit', async (req, res) => {
    const { remoteRepo, token, files, commitMessage } = req.body as {[key: string]: string | IFile[]};

    const tempFolder = directory();

    const sg = simpleGit(tempFolder);
    await sg.clone(`https://${token}@github.com/${remoteRepo}.git`, tempFolder);
    (<IFile[]>files).forEach((file: IFile) => {
      writeFileDeepSync(join(tempFolder, file.path), file.content);
    });

    await sg.add('./*');
    await sg.addConfig('user.email', 'bot@spread-the-code.com');
    await sg.addConfig('user.name', 'committer-bot');

    await sg.commit(<string>commitMessage || 'unknow commit');
    await sg.push();

    res.send('done');
  });

  return app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}

interface IFile {
  path: string;
  content: string;
}