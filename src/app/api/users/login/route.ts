import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import connect from "@/db/index";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found", status: 404 });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({ message: "Incorrect password", status: 400 });
    }

    const tokenData = {
      id: user._id,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "User logged in",
      status: 200,
    });

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1);

    response.cookies.set("uit", token, {
      httpOnly: true,
      secure: true,
      expires: expirationDate,
    });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Could not login user", status: 500 });
  }
}
