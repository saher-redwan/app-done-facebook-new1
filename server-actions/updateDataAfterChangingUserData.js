"use server";

import Post from "@/models/Post";
import { getServerSession } from "next-auth";

export async function updateNameForPosts({ newName, newImg }) {
  // now we will just dealing with name filed...
  const session = await getServerSession();

  // console.log("session.user.name::::", session.user.name);

  const res = await Post.updateMany(
    { "user.email": session.user.email },
    {
      "user.publisher": newName,
      ...(newImg && { "user.userImage": newImg }),
    }
  );
}
