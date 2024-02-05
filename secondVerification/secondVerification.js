import { User } from "../registeration/userSchema.js";
import { transporter } from "../shared/services/mail.service.js";
import { nanoid } from "nanoid";

export const secondVerification = async (req, res) => {
  const email = req.body.email;
  const user = await User.find({ email });
  const isVerify = user[0].verify;
  const userToken = user[0].verificationToken;
  const generateToken = nanoid();
  await User.updateOne({ email }, { verificationToken: generateToken });

  const linkToActivate = `http://localhost:3000/auth/verify/${userToken}`;
  const emailOptions = {
    from: "nor-reply@sandbox28a0ff2fc84d4d8692fbab4594e7e8b9.mailgun.org",
    to: "gotio12316@gmail.com",
    subject: "Powitanie ",
    text: "Cześć. Testujemy wysyłanie wiadomości! Piotr Koczkodaj",
    html: `<b>Your verification token, copy and paste into your browser to activate account: <a href="${linkToActivate}">${linkToActivate}</a></b>`,
  };

  if (email === "") {
    console.log(email);
    return "Missing required field email";
  }

  if (isVerify === true) {
    return "Verification has already been passed";
  }

  await transporter
    .sendMail(emailOptions)
    .then((info) => console.log(info))
    .catch((err) => console.log(err));

  return "Verification email sent";
};
