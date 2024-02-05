import 'dotenv/config';
import nodemailer from 'nodemailer';

const config = {
  host: 'smtp.mailgun.org',
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAILGUN_USER,
    pass: process.env.MAILGUN_PASSWORD,
  },
};

export const transporter = nodemailer.createTransport(config);

