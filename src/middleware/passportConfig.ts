import User from '../db/models/User';
import bcrypt from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';
import { PassportStatic } from 'passport';
import { IUser } from '../db/models/User';

const passportConfig = (passport: PassportStatic) => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
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
    console.log(2);
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

export default passportConfig;
