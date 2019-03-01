import User from './User';
import { expect } from 'chai';

beforeLauch(): function() {
  require('ts-node');
}

describe('UserCreation', () => {
  it('should return a non empty object when givin valid data', (done) => {
    const data = {
      username: 'Benoctopus',
      password: 'Pass123!',
    };
    const user = new User(data);

    expect(!!user).to.equal(true);
    expect(user.username).to.equal('benoctopus');
    done();
  })
})