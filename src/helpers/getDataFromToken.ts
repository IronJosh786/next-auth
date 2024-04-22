import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const getId = (request: NextRequest) => {
  try {
    const token = request.cookies.get("uit")?.value || "";
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decodedToken.id;
  } catch (error) {
    console.log(error);
    // return NextResponse.json({ message: "Could not get token", status: 500 });
    return undefined;
  }
};
