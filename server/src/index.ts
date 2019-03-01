import { getServer } from './server';
import { User } from './models';

const user = new User({
  username: 'Bennyoctopus',
  password: 'Pass123!'
})

console.log('user', user);

const server = getServer();

server.listen();
