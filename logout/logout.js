import { User } from '../registeration/userSchema.js';
import jwt from "jsonwebtoken";

const logout = async (req) => {

    let tokenFromRequest = req.headers.authorization;
    const tokenWithoutBearer = tokenFromRequest.slice(7)
    const userFromToken = jwt.decode(tokenWithoutBearer);

    return  await User.findOneAndUpdate({ _id: userFromToken.id },{token:null}) ;
 
   
}

export {logout}