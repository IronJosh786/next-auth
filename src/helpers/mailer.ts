import nodemailer from "nodemailer";

interface Data {
  email: string;
  emailType: string;
  userId: string;
}

export const sendMail = async ({ email, emailType, userId }: Data) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: "maddison53@ethereal.email",
        pass: "jn7jnAPss4f63QBp6D",
      },
    });
    const mailOptions = {
      from: "test@test.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verfiy your email" : "Reset your password",
      html: "<b>Hello world?</b>",
    };
    const response = await transporter.sendMail(mailOptions);
    return response;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "An unknown error occurred while sending mail"
    );
  }
};
