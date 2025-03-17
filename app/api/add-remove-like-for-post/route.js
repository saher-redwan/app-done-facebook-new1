import connectMongoDB from "@/lib/mongodb";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export async function PUT(request) {
  const { operation, _id_post, _id_user, user } = await request.json();

  // // console.log("ccccccccccccccccccc", { operation, _id_post, _id_user, user });

  await connectMongoDB();

  let response = undefined;

  if (operation == "removing") {
    // removing like
    // console.log("user from removing ,,,,,,,", user);
    const data = await Post.updateOne(
      { _id: _id_post },
      { $pull: { "likes.users": { _id: _id_user } } }
    );
    // console.log("data after (( removing )) like::::::::", data);

    response = {
      operation: "removing",
      ...data,
    };
    // return NextResponse.json({ message: data });
  }

  if (operation == "adding") {
    // adding like
    // console.log("user from adding ,,,,,,,", user);
    // console.log("_id_post::::: ::::: ", _id_post);
    const data = await Post.updateOne(
      { _id: _id_post },
      { $push: { "likes.users": { ...user } } }
    );
    // console.log("data after (( adding )) like::::::::", data);

    response = {
      operation: "adding",
      ...data,
    }; // return NextResponse.json({ message: data });
  }

  if (response == undefined) {
    return NextResponse.json({
      message: "Failed",
    });
  }

  // now get current count of post likes
  const count = await Post.find(
    { _id: _id_post },
    { likesCountOfPost: { $size: "$likes.users" }, _id: false }
  );

  // console.log("count000000000000000000000000000,,,,", count);

  return NextResponse.json({
    operation: response?.operation,
    likesCountOfPost: count[0],
  });
}
