import connectMongoDB from "@/lib/mongodb";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { user_id } = await request.json();

  if (!user_id) {
    return NextResponse.json({ message: "Failed to get isLiked." });
  }

  // console.log("user_id............", user_id);
  await connectMongoDB();

  // this will return array with just _id field of Post, To compare whether this user gave a like or not (at the frontend)?
  const arrOfPostLiked = await Post.find(
    { "likes.users._id": user_id },
    { _id: true }
  );

  // console.log("arrOfPostLiked;;;;;;;;;;;;;;;;;;;;;;; ", arrOfPostLiked);

  return NextResponse.json({ arrOfPostLiked });
}
