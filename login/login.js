import { User } from "../registeration/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import "dotenv/config";
const secret = process.env.SECRET;

const login = async (body) => {
   
  const validatePassword = User.find({ email: body.email }).then((resp) => {
    const hashedPassword = resp[0].password;
    const isPasswordMatched = bcrypt.compareSync(body.password, hashedPassword);

    if (isPasswordMatched) {
      return true;
    }
  });

  if ((await validatePassword) === true) {
    const user = await User.find({ email: body.email });

    const payload = {
      id: user[0]._id,
      email: user[0].email,
      subscription:user[0].subscription
      
    };
    const generateToken = jwt.sign(payload, secret, { expiresIn: "1h" });
    await User.findOneAndUpdate({ _id: user[0].id }, { token: generateToken });
    
    return {
      email: user[0].email,
      subscription: user[0].subscription,
      token:user[0].token
    }
    
   
  }
};

export { login };
