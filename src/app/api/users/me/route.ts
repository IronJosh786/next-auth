import connect from "@/db/index";
import { getId } from "@/helpers/getDataFromToken";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    const id = await getId(request);
    // if (id === undefined) {
    //   return NextResponse.json({
    //     message: "Could not fetch data",
    //     status: 400,
    //   });
    // }
    const user = await User.findById(id).select("-password");
    if (!user) {
      return NextResponse.json({ message: "User not found", status: 404 });
    }
    return NextResponse.json({
      message: "Fetched data",
      status: 200,
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 400 });
  }
}
