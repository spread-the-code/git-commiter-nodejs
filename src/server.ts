import * as bodyParser from 'body-parser';
import * as express from 'express';
import {Server} from 'http';
import {join} from 'path';
// tslint:disable-next-line:no-submodule-imports
import * as simpleGit from 'simple-git/promise';
import {directory} from 'tempy';
import {writeFileDeepSync} from './utils';

export function startServer(port = process.env.PORT || 3000): Promise<Server> {
  const app = express();

  app.use(bodyParser.json());

  app.get('/', (_req, res) => res.send('Hello World!'))

  app.post('/commit', async (req, res) => {
    const { remoteRepo, token, files, commitMessage } = req.body as {[key: string]: string | IFile[]};

    if (!remoteRepo || !token || !files || !commitMessage) {
      res.status(500).send(`Payload isn't complete`);

      return;
    }

    const tempFolder = directory();
    const sg = simpleGit(tempFolder);
    await sg.clone(`https://${token}@github.com/${remoteRepo}.git`, tempFolder);

    (<IFile[]>files).forEach((file: IFile) => {
      writeFileDeepSync(join(tempFolder, file.path), file.content);
    });

    await sg.add('./*');
    await sg.addConfig('user.email', 'bot@spread-the-code.com');
    await sg.addConfig('user.name', 'committer-bot');

    await sg.commit(<string>commitMessage);
    await sg.push();

    res.send('done');
  });

  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      console.log(`Example app listening on port ${port}!`);
      resolve(server);
    });
  })
}

interface IFile {
  path: string;
  content: string;
}