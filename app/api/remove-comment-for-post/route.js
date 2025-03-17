import connectMongoDB from "@/lib/mongodb";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export async function PUT(request) {
  const { _id_post, _id_comment } = await request.json();

  if (!_id_post || !_id_comment) {
    return NextResponse.json({
      message: "Failed...",
    });
  }

  await connectMongoDB();

  // removing comment
  const data = await Post.updateOne(
    { _id: _id_post },
    { $pull: { "comments.comments": { _id: _id_comment } } }
  );
  // console.log("data after..............", data);

  return NextResponse.json(data);
}
