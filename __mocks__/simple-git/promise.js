const simpleGit = require('simple-git/promise');
const {readdirSync} = require('fs');

let sg;
const listeners = [];

module.exports = (localFolder) => {
  if (localFolder) {
    listeners.forEach(listener => {
      listener(localFolder);
    });
    sg = simpleGit(localFolder);
  }
  return {
    clone: async () => {
      await sg.init();
    },
    add: () => {
      // console.log('mock add!!!');
    },
    addConfig: () => {
      // console.log('mock addConfig!');
    },
    status: () => {
      return sg.status();
    },
    commit: async () => {
      // console.log('mock commit', readdirSync(localFolder));
    },
    push: () => {
      // console.log('mock push');
    },
    _dispose: () => {
      sg = null;
    }
  }
}