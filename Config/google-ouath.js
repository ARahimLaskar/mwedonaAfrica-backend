const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const GoogleUserModel = require("../Model/googleUserModel");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      let email = profile._json.email;
      let name = profile._json.name;
      const existingUser = await GoogleUserModel.findOne({ email });

      if (existingUser) {
        return cb(null, existingUser);
      } else {
        const user = new GoogleUserModel({
          name,
          email,
          password: uuidv4(),
        });
        await user.save();
        console.log(user);

        return cb(null, user);
      }
    }
  )
);
module.exports = passport;
