import nodemailer from "nodemailer";

let transporter;

const getTransporter = () => {
  if (transporter) return transporter;

  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    throw new Error("Missing EMAIL_USER or EMAIL_PASS environment variables.");
  }

  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  return transporter;
};

export const sendContactEmail = async ({ name, email, message }) => {
  const mailer = getTransporter();
  await mailer.sendMail({
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: "SONIJEET660@GMAIL.COM",
    replyTo: email,
    subject: `Portfolio Contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  });
};
