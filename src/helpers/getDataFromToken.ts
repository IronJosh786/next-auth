import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const getId = (request: NextRequest) => {
  try {
    const token = request.cookies.get("uit")?.value || "";
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decodedToken.id;
  } catch (error) {
    return undefined;
  }
};
