import * as bodyParser from 'body-parser';
import { execSync, spawnSync } from 'child_process';
import * as express from 'express';
import { join } from 'path';
import{ directory } from 'tempy';
import { writeFileDeepSync } from './utils';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (_req, res) => res.send('Hello World!'))

app.post('/commit', (req, res) => {
  const { remoteRepo, token, files, commitMessage } = req.body as {[key: string]: string | IFile[]};
  const [, repoName] = (<string>remoteRepo).split('/');

  const tempFolder = directory();

  const options = (subFolder: string = repoName) => ({
    encoding: 'utf8',
    cwd: join(tempFolder, subFolder)
  });

  const {output} = spawnSync('git', ['clone', `https://${token}@github.com/${remoteRepo}.git`], options(''));
  console.log(output[2]);

  (<IFile[]>files).forEach((file: IFile) => {
    writeFileDeepSync(join(tempFolder, repoName, file.path), file.content);
  });

  console.log('> git add')
  execSync('git add .', options());

  console.log('> git status')
  spawnSync('git', ['status'], {...options(),  stdio:'inherit'});

  execSync('git config user.email "bot@spread-the-code.com"', options());
  execSync('git config user.name "commit-bot"', options());

  console.log('> git commit')
  execSync(`git commit -m "${commitMessage || 'unknow commit'}"`, {...options(),  stdio:'inherit'});

  console.log('> git push');
  try {
    const pushResult = spawnSync('git', ['push'], options());
    console.log(pushResult.output);
  } catch (error) {
    console.log('error', error);
  }
  res.send('done');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

interface IFile {
  path: string;
  content: string;
}