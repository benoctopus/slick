const router = require('express').Router();

module.exports = passport => {
  router.get('/test', (req, res) => {
    console.log();
    res.send(req.user);
  });

  router.post(
    '/localsignup',
    passport.authenticate('local-signup'),
    (req, res) => {
      // console.log('hit');
      if (req.user) {
        if (process.env.NODE_ENV === 'development') {
          // console.log(req.user);
        }
        res.status(200).json({ id: req.user });
      } else {
        res.status(401).send({});
      }
    }
  );

  router.post(
    '/anonsignup',
    passport.authenticate('local-anon'),
    (req, res) => {
      res.json({ ok: !!req.user });
    }
  );

  return router;
};
