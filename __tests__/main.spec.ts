import * as server from '../src/server';

describe('main', () => {
  it('should start the server', () => {
    jest.spyOn(server, 'startServer').mockImplementation(() => ({}));
    // tslint:disable-next-line:no-require-imports
    require('../src/main');
    expect(server.startServer).toBeCalled();
  });
});