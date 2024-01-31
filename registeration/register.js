import { User } from "./userSchema.js";
import bcrypt from "bcryptjs";
import Joi from "joi";
import gravatar from 'gravatar';

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


  console.log(gravatar.profile_url(email))

  if (await User.findOne({ email }) === null) {
    
   const user = new User({
     email,
     password
   })
    
    user.save();
    return await User.find()
    
  } else {
   return 'Email in use'
  }

};

export { registerUser };
