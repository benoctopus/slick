import { expect } from 'chai';
import { getServer, App } from './index';

describe('server: basic', () => {
  it('should start and be of type App', (done) => {
    let app: App;
    try {
      app = getServer(9999, 'not secret');
      expect(app instanceof App).to.equal(true, 'item returned from get server was not of type App');
      app.listen();
      app.kill();
    } catch (err) {
      expect(false).to.equal(true, 'An error was thrown while tring to start up');
    } finally {
      done()
    }
  });
  it('getServer should return a singleton', (done) => {
    const app1 = getServer();
    const app2 = getServer();
    expect(app1 === app2).to.equal(true, 'get seret server returned separate instances')
    done();
  })
})