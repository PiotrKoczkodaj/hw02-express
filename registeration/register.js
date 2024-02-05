import avatar from "gravatar";
import bcrypt from "bcryptjs";
import Joi from "joi";
import { nanoid } from "nanoid";
import { User } from "./userSchema.js";
import { transporter } from "../shared/services/mail.service.js";

const registerUser = async (body) => {
  const salt = bcrypt.genSaltSync(10);
  const email = body.email;
  const password = bcrypt.hashSync(body.password, salt);


  const userProfile = avatar.url(email, { s: "200", r: "pg" });

  if ((await User.findOne({ email })) === null) {
    const user = new User({
      email,
      password,
      avatarUrl: userProfile,
      verificationToken:nanoid(),
    });

    user.save();

  const emailOptions = {
  from: 'nor-reply@sandbox28a0ff2fc84d4d8692fbab4594e7e8b9.mailgun.org',
  to: 'gotio12316@gmail.com',
  subject: 'Powitanie ',
  text: 'Cześć. Testujemy wysyłanie wiadomości! Piotr Koczkodaj',
};

     await transporter
      .sendMail(emailOptions)
    .then(info => console.log(info))
  .catch(err => console.log(err));

    await user

    return await User.find();
  } else {
    return "Email in use";
  }
};

export { registerUser };
