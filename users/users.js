import { User } from "./userSchema.js";
import bcrypt from "bcryptjs";
import Joi from "joi";

const users = () => {
  return User.find();
};

const registerUser = async (body) => {
  const salt = bcrypt.genSaltSync(10);

  const email = body.email;
  const password = bcrypt.hashSync(body.password,salt);

  const validateUser = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "pl"] } })
      .required(),
    password: Joi.required(),
  });

  const validatedUser = { ...validateUser.validate({ email, password }) };

  if (validatedUser.error !== undefined) {
    return validatedUser.error.details[0].message;
  }

  const user = new User({
    email,
    password,
  });

  user.save();
};

export { registerUser };
