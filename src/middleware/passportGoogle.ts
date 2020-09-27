import passport from 'passport';
import passportGoogle from 'passport-google-oauth20';
import User from '../db/models/User';
const { GOOGLE_CLIENT_ID, GOOGLE_SECRET } = process.env;

const GoogleStrategy = passportGoogle.Strategy;

passport.use(
  new GoogleStrategy(
    {
      // options for google strategy
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_SECRET,
      callbackURL: '/google/redirect'
    },
    async (accessToken, refreshToken, profile, done) => {
      // check if user already exists in our own db
      // const currentUser = await User.findOne({ googleId: profile.id });
      // if (!currentUser) {
      //   const user = await User.create({
      //     name: {
      //       first: profile.name?.givenName || 'User',
      //       last: profile.name?.familyName || ''
      //     },
      //     email: profile.emails?.[0].value
      //   });
      // }
      // if not, create user in our db
      console.log(accessToken, refreshToken, profile);
      done();
    }
  )
);
