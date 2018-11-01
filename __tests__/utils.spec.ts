import {readFileSync} from 'fs';
import { join } from 'path';
import {directory} from 'tempy';
import {writeFileDeepSync} from '../src/utils';

describe('Function:: writeFileDeep', () => {
  it('should create file and its path', () => {
    const dir = directory();
    const path = join(dir, 'folder1/folder2/file.txt');
    const content = 'my awesome content';

    writeFileDeepSync(path, content);
    expect(readFileSync(path, {encoding: 'utf8'})).toEqual(content);
  });
});