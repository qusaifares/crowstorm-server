import User, { IUser } from '../db/models/User';
import bcrypt from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';
import { PassportStatic } from 'passport';

const passportLocal = (passport: PassportStatic) => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) throw err;
        // if user doesnt exist return
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password as string, (err, result) => {
          if (err) throw err;
          if (result) {
            return done(null, user);
          } else {
            return done('Incorrect password', false);
          }
        });
      }).select('+password');
    })
  );

  passport.serializeUser((user: IUser, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      if (!user) return cb(err, false);
      const userInformation = {
        email: user.email
      };
      cb(err, userInformation);
    });
  });
};

export default passportLocal;
