// passport setup

import { PassportStatic, Strategy } from 'passport';

const strategies: { [key: string]: Strategy } = {
  ...require('./local')(db: any)
};

module.exports = (passport: PassportStatic, db: any) => {
  passport.serializeUser((id, done) => {
    done(null, id);
  });

  passport.deserializeUser((id, done) => {
    // console.log('u', id);
    done(null, { id });
  });

  Object.keys(strategies).forEach((key: string) => {
    passport.use(strategies[key])
  })

  // Object.entries(strategies).forEach(([name: string, strategy: Strategy]) => {
  //   passport.use(name, strategy(db));
  // });

  return passport;
};
