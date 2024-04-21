import connect from "@/db/index";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendMail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    console.log(newUser);

    await sendMail({
      email,
      emailType: "VERIFY",
      userId: newUser._id.toString(),
    });

    return NextResponse.json({
      message: "Registration successful",
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Could not register user" },
      { status: 500 }
    );
  }
}
