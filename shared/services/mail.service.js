import 'dotenv/config';
import nodemailer from 'nodemailer';

const config = {
  host: 'smtp.mailgun.org',
  port: 587,
  secure: false,
  auth: {
    user: 'postmaster@sandbox28a0ff2fc84d4d8692fbab4594e7e8b9.mailgun.org',
    pass: 'e941ff16d11653fd92595003e2f87987-69a6bd85-8bd32650',
  },
};

export const transporter = nodemailer.createTransport(config);

