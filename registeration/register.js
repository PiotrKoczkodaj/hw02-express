import { User } from "./userSchema.js";
import bcrypt from "bcryptjs";
import Joi from "joi";

const registerUser = async (body) => {
  const salt = bcrypt.genSaltSync(10);

  const email = body.email;
  const password = bcrypt.hashSync(body.password,salt);

  const validateUser = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "pl"] } })
      .required(),
    password: Joi.string().required(),
  });

  // const validatedUser = { ...validateUser.validate({ email, password }) };
  
  if (await User.findOne({ email }) === null) {
    
   const user = new User({
     email,
     password
   })
    
    user.save();
    
  } else {
   return 'Email in use'
  }

};

export { registerUser };
