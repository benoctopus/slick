import { getServer } from './server';
import User from './models/User';

const user = new User({
  username: 'Benoctopus',
  password: 'Pass123!'
}).save().then((data) => console.log(data));


getServer().listen();
