import passport from "passport";
import passportJWT from "passport-jwt";
import { User } from "../registeration/userSchema.js";
import "dotenv/config";

const secret = process.env.SECRET;
const ExtractJWT = passportJWT.ExtractJwt;

export const strategy = new passportJWT.Strategy(
  {
    secretOrKey: secret,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  },
  function (payload, done) {
    User.find({ _id: payload.id })
      .then(([user]) => {
        if (!user) {
          return done(new Error("User not found"));
        }
        return done(null, user);
      })
      .catch((err) => done(err));
  }
);

passport.use(strategy)
