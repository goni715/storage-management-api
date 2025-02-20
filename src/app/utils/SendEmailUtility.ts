import config from "../config";
import nodemailer from "nodemailer";

const SendEmailUtility = async (EmailTo: string, EmailText: string) => {
  //transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports //587,
    auth: {
      user: config.smtp_username,
      pass: config.smtp_password,
    },
  });

  const mailOptions = {
    from: `Storage Management ${config.smtp_from}`, //sender email address//smtp-username
    to: EmailTo, //receiver email address
    subject: "Storage Management Reset Password",
    html: `
             <p>Your Verification Code is: <span style="font-size: 16px; font-weight: bold;">${EmailText}</span>
              The OTP code is valid for 10 minutes.</p>`,
  };

  return await transporter.sendMail(mailOptions);
};

export default SendEmailUtility;
