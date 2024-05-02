import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const getId = (request: NextRequest): string | undefined => {
  try {
    const token = request.cookies.get("uit")?.value || "";
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    console.log("inside get-token", decodedToken.id);
    return decodedToken.id;
  } catch (error) {
    return undefined;
  }
};
