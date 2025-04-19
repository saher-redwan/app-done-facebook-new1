import connectMongoDB from "@/lib/mongodb";
import Post from "@/models/Post";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  // fisrtly we will check if this for spesific user or for home page.
  const userid = request.nextUrl.searchParams.get("userid");
  // console.log("userid ::::: ", userid);

  //
  await connectMongoDB();

  // task: find way to get all properties except custom property like here (comments and likes arr)...
  const projectionData = {
    // _id will sending by default
    title: true,
    description: true,
    image: true,
    user: true,
    likes_count: { $size: "$likes.users" },
    comments_count: { $size: "$comments.comments" },
    // here we dont need all the data of user, because that will be expensive for the server, so we just get array of ids
    "likes.users._id": true,
    updatedAt: true,
    isEdited: true,
    // comments,
  };

  // for pagination
  const limit_perPage = 8;
  const page_num = request.nextUrl.searchParams.get("page_num");
  // console.log("0 0 0 page_num", page_num);
  const page = Number(page_num) || 1;
  const skip = (page - 1) * limit_perPage;

  // Posts For Profile Page
  if (userid) {
    const postsCount = await Post.countDocuments({ "user._id": userid });

    const totalPages = Math.ceil(postsCount / limit_perPage);

    const hasMore = totalPages > page;

    const posts = await Post.find({ "user._id": userid }, projectionData)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit_perPage);
    return NextResponse.json({ posts, hasMore });
  }

  // otherwise
  // All Posts For Home Page
  // const posts = await Post.find({}, projectionData);
  const postsCount = await Post.countDocuments();

  const totalPages = Math.ceil(postsCount / limit_perPage);

  const hasMore = totalPages > page;

  const posts = await Post.find({}, projectionData)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit_perPage);

  return NextResponse.json({ posts, hasMore });
}

export async function POST(request) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ message: "You're Not Allowed To Do This" });
  }

  const {
    title,
    description,
    image,
    user: { publisher, email, userImage, _id },
    likes: {
      users: [
        // {_id: "", name: "", img: ""}
      ],
    },
    comments: {
      comments: [
        // {text: "", user: {_id: "", name: "", img: ""}}
      ],
    },
  } = await request.json();
  await connectMongoDB();
  const newPost = await Post.create({
    title,
    description,
    image,
    user: { publisher, email, userImage, _id },
    likes: {
      // count: 0,
      users: [
        // {_id: "", name: "", img: ""}
      ],
    },
    comments: {
      // count: 0,
      comments: [
        // {text: "", user: {_id: "", name: "", img: ""}}
      ],
    },
  });

  console.log("newPost:: here is data... ", newPost);
  return NextResponse.json(
    { message: "Post Created", post: newPost },
    { status: 201 }
  );
}

export async function DELETE(request) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ message: "You're Not Allowed To Do This" });
  }

  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Post.findByIdAndDelete(id);
  return NextResponse.json({ message: "Post deleted" }, { status: 200 });
}
