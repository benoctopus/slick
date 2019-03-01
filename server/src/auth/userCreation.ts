const validator = require('validator');

module.exports.containsSpecialChars = (function() {
  const passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;

  return str => passReg.test(str);
})();

module.exports.createRegisteredLocalUser = async (db, body) => {
  const errors = {};
  let { username, email, password } = body;

  username = username.trim();
  password = password.trim();
  email = email.trim();

  try {
    if (!validator.isEmail(email)) {
      errors.email = 'Invalid email address.';
    }

    if (!module.exports.containsSpecialChars(password)) {
      errors.password =
        'Password must contain at least one lower case letter,' +
        ' one upper case letter, one numerical character, ' +
        ' and one special character(!, @, #, $, &, %)';
    }

    if (!validator.isLength(password, { min: 9, max: 100 })) {
      errors.password = 'Password must be at least 9 characters';
    }

    if (validator.isLength(username, { min: 4, max: 20 })) {
      errors.username = 'Your username should be between 4 and 20 characters';
    }

    if (await db.$exists.user({ username })) {
      errors.username = 'This username is already taken';
    }

    if (!Object.keys(errors).length) {
      return {
        ok: false,
        errors
      };
    }

    return {
      ok: true,
      id: await (async function() {
        return (await db.createUser({
          username,
          email,
          localLogin: {
            create: [
              {
                password
              }
            ]
          }
        })).id;
      })()
    };
  } catch (err) {
    if (process.env.NODE_ENV === 'development') console.log(err);

    return {
      server: 'There was a problem with our servers, please try again later.'
    };
  }
};

module.exports.createAnonUser = async db => {
  let res;
  try {
    res = await db.createUser({});
  } catch (err) {
    if (process.env.NODE_ENV === 'development') console.log(err);
    return { ok: false, error: err.code, id: null };
  }

  return {
    id: res.id || null,
    ok: !!res.id,
    error: res.id ? null : 501
  };
};
