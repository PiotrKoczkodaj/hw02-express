import avatar from "gravatar";
import bcrypt from "bcryptjs";
import Joi from "joi";
import { User } from "./userSchema.js";

const registerUser = async (body) => {
  const salt = bcrypt.genSaltSync(10);
  const email = body.email;
  const password = bcrypt.hashSync(body.password, salt);

  const validateUser = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "pl"] } })
      .required(),
    password: Joi.string().required(),
  });

  const userProfile = avatar.url(email, { s: "200", r: "pg" });

  if ((await User.findOne({ email })) === null) {
    const user = new User({
      email,
      password,
      avatarUrl: userProfile,
    });
    user.save();
    return 'Rejestracja Pomyślna';
  } else {
    return "Email in use";
  }
};

export { registerUser };
