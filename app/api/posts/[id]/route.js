import connectMongoDB from "@/lib/mongodb";
import Post from "@/models/Post";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ message: "You're Not Allowed To Do This" });
  }

  const { id } = params;
  const { newTitle: title, newDescription: description } = await request.json();
  await connectMongoDB();
  // await Post.findByIdAndUpdate(id, {
  //   title,
  //   description,
  //   // create this property (isEdited)
  //   $set: {
  //     isEdited: true,
  //   },
  // });
  await Post.updateOne(
    { _id: id },
    {
      $set: {
        title,
        description,
        // create this property (isEdited)
        isEdited: true,
      },
    }
  );
  return NextResponse.json({ message: "Post updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const post = await Post.findOne({ _id: id });
  return NextResponse.json({ post }, { status: 200 });
}
