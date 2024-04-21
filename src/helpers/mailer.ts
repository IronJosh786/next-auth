import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import { User } from "@/models/user.model";

interface Data {
  email: string;
  emailType: string;
  userId: string;
}

export const sendMail = async ({ email, emailType, userId }: Data) => {
  try {
    const hash = await bcryptjs.hash(userId, 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hash,
        verifyTokenExpiry: Date.now() + 60 * 60 * 1000,
      });
    } else if (emailType === "RESET_PASSWORD") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hash,
        forgotPasswordTokenExpiry: Date.now() + 60 * 60 * 1000,
      });
    }

    var transport = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: Number(process.env.MAILTRAP_PORT),
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    const mailOptions = {
      from: "test@test.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verfiy your email" : "Reset your password",
      html: generateEmailContent(emailType, hash),
    };
    const response = await transport.sendMail(mailOptions);
    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const generateEmailContent = (emailType: string, token: string): string => {
  if (emailType === "VERIFY") {
    return `<p>Hello, please verify your account by clicking <a href="${process.env.DOMAIN}/verifyemail?token=${token}">here</a>.</p>`;
  } else if (emailType === "RESET_PASSWORD") {
    return `<p>Hello, you have requested to reset your password. Click <a href="${process.env.DOMAIN}/resetpassword?token=${token}">here</a> to reset your password.</p>`;
  } else {
    return "<p>Hello world?</p>";
  }
};
