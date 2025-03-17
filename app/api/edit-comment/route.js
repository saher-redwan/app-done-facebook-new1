import connectMongoDB from "@/lib/mongodb";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export async function PUT(request) {
  const { _id_post, _id_comment, updatedText } = await request.json();

  if (!_id_post || !_id_comment) {
    return NextResponse.json({ message: "Failed..." });
  }

  await connectMongoDB();
  const updatedData = await Post.updateOne(
    { _id: _id_post, "comments.comments._id": _id_comment },
    {
      $set: {
        "comments.comments.$.commentText": updatedText,
        // this below is adding new property (isEdited: true) to this document(object), (it doeso't already exist)
        "comments.comments.$.isEdited": true,
        //
        "comments.comments.$.updatedAt": new Date().toJSON(),
      },
    }
  );

  return NextResponse.json(updatedData);
}
