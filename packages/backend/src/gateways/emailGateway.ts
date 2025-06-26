import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

const JWT_EMAIL_SECRET = process.env.JWT_EMAIL_SECRET!;
const EMAIL_USER = process.env.EMAIL_USER!;
const EMAIL_PASS = process.env.EMAIL_PASS!;

export async function sendVerificationEmail(email: string) {
  const token = jwt.sign({ email }, JWT_EMAIL_SECRET, { expiresIn: "1h" });
  const verificationUrl = `http://localhost:5173/verify-email?token=${token}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"RecipeAid" <${EMAIL_USER}>`,
    to: email,
    subject: "Verify your email address",
    html: `<p>Welcome to RecipeAid!</p>
    <p>Please <a href="${verificationUrl}">Click here</a> to verify your email</p>`,
  });
}
