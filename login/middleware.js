import passport from "passport";;
import { strategy } from "./strategy.js";

export const auth = (req, res, next) => {
    passport.authenticate(strategy, (err, user) => {
        if (err || !user) {
            return res.status(401).json({message:'Token is invalid'})
        }
        req.user = user;
        next()
    })(req,res,next)
}

