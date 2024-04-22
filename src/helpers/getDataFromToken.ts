import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const getId = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("uit")?.value || "";
    const decodedToken: any = await jwt.verify(
      token,
      process.env.TOKEN_SECRET!
    );
    const id: string = decodedToken.id;

    return id;
  } catch (error) {
    return undefined;
  }
};
