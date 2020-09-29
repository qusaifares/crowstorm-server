import User, { IUser } from '../db/models/User';
import bcrypt from 'bcrypt';
import { Strategy as CustomStrategy } from 'passport-custom';
import { PassportStatic } from 'passport';

const passportCustom = (passport: PassportStatic) => {
  passport.use(
    'client-google',
    new CustomStrategy(async (req, done) => {
      const { email, name } = req.body;
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return done(null, existingUser);
        } else {
          const { first, last } = name;
          const user = await User.create({ name: { first, last }, email });
          return done(null, user);
        }
      } catch (error) {
        return done(error, false);
      }
    })
  );
  passport.serializeUser((user: IUser, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      console.log(err, user);
      if (!user) return cb(err, false);
      const userInformation = {
        email: user.email
      };
      cb(err, userInformation);
    });
  });
};

export default passportCustom;
