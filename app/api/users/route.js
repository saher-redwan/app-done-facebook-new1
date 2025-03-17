import connectMongoDB from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function PUT(request) {
  // why the url here printed .../users and not the current url of the page that request comes from!! search for it.
  // const id = request.nextUrl.searchParams.get("id");
  const body = await request.json();
  const { id, newName: name, newImg: image } = body;
  await connectMongoDB();

  // image ?
  await User.findByIdAndUpdate(id, {
    name,
    // this is js logic (check if image exists then put it or the oppoite)
    ...(image && { image }),
  });

  return NextResponse.json({ message: "data updated" }, { status: 200 });
}

export async function POST(request) {
  const body = await request.json();
  const { userId } = body;
  // console.log("id::: ::: ::: :::", body);
  await connectMongoDB();
  // const userInfo = await User.findById(id, { name: true, image: true });
  // const userInfo = await User.findById(id);
  const userInfo = await User.findById(userId, { name: true, image: true });
  return NextResponse.json({ userInfo });
}
