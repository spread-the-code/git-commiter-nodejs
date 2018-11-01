import {appendFileSync, existsSync, mkdirSync} from 'fs';
import * as path from 'path';

export function writeFileDeep(fullPath: string, content: string) {
  ensureDirectoryExistence(fullPath);

  return appendFileSync(fullPath, content);
}

function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  mkdirSync(dirname);
}