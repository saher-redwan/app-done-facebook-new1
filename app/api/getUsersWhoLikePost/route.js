import connectMongoDB from "@/lib/mongodb";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { post_id } = await request.json();

  if (!post_id) {
    return NextResponse.json({ message: "Failed to get isLiked." });
  }

  await connectMongoDB();
  const users = await Post.find(
    { _id: post_id },
    { "likes.users": true, _id: false }
  );

  return NextResponse.json({
    data: users[0],
  });
}
