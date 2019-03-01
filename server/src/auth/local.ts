import { Strategy } from 'passport-local';
const { createRegisteredUser, createAnonUser } = require('./userCreation.js');

module.exports = (db: any) => ({
  'local-login': new Strategy({}, (username, pass, done) => { }),
  // 'local-signup': new Strategy(
  //     {
  //       passReqToCallback: true
  //     },
  //     ({ body }, u, p, done) => {
  //       createRegisteredUser(db, body).then(res => {
  //         if (res.ok) {
  //           done(null, res.id);
  //         } else {
  //           done(res.errors);
  //         }
  //       });
  //     }
  //   ),
  'local-anon': new Strategy(
    {
      passReqToCallback: true,
      usernameField: 'u',
      passwordField: 'p'
    },
    (r, u, p, done) => {
      console.log('yer');
      createAnonUser(db).then((res: any) => {
        if (res.ok) done(null, res.id);
        else done(res.error);
      });
    }
  )
});
