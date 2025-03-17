import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    const body = await req.json();
    const email = body.email;
    // // console.log('email::::::', email);
    //Confirm data exists
    if (email) {
      await connectMongoDB();
      const userInfo = await User.findOne({ email });
      // // console.log("userInfo:::::, ", userInfo);
      return NextResponse.json(userInfo);
      // return NextResponse.json({ email });
    } else {
      return NextResponse.json({ message: "error" });
    }
  } catch (err) {
    // console.log(err);
  }
}
