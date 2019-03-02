import User from './User';
import { expect } from 'chai';

describe('User.ts: basic', () => {
  it('should return a valid User object when givin valid data', (done) => {
    const data = {
      username: 'Benoctopus',
      password: 'Pass123!',
    };
    const user = new User(data);

    expect(!!user).to.equal(true, 'resulting object should exist');
    expect(user instanceof User).to.equal(true, 'resulting object should be of type User');
    expect(user.username).to.equal('Benoctopus', 'username should exist and be same as input');
    done();
  })
})