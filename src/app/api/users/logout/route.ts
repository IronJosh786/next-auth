import connect from "@/db/index";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json({
      message: "User logged out",
      status: 200,
      success: true,
    });

    response.cookies.set("uit", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Could not logout user" });
  }
}
