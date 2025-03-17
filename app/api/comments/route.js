import connectMongoDB from "@/lib/mongodb";
import Post from "@/models/Post";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  const postid = request.nextUrl.searchParams.get("postid");

  if (!postid) {
    return NextResponse.json({ message: "Failed to get isLiked." });
  }

  await connectMongoDB();

  // for pagination
  const commentsCount = await Post.find(
    { _id: postid },
    { comments_count: { $size: "$comments.comments" }, _id: false }
  );
  const pureCommentsCount = commentsCount[0]._doc.comments_count;

  let limit_perPage = 7;
  const page_num = request.nextUrl.searchParams.get("page_num");
  const page = Number(page_num) || 1;
  // const skip = (page - 1) * limit_perPage;
  // const skip = pureCommentsCount - limit_perPage * page;
  let skip = pureCommentsCount - limit_perPage * page;
  // pureCommentsCount - limit_perPage * page;

  // // console.log("skip  xxx", pureCommentsCount);
  // // console.log("skip  xxx2", commentsCount[0]);

  const totalPages = Math.ceil(pureCommentsCount / limit_perPage);

  // const hasMore = totalPages > page;
  const hasMore = totalPages > page;

  // this with entire array
  // const comments = await Post.find(
  //   { _id: postid },
  //   { "comments.comments": true, _id: false }
  // )

  // const comments = await Post.find(
  //   { _id: postid },
  //   {
  //     slicedComments: { $slice: ["$comments.comments", skip, limit_perPage] },
  //     _id: false,
  //   }
  // );

  // const skipLogic = () => {
  //   if (pureCommentsCount - page * limit_perPage <= limit_perPage) {
  //     limit_perPage = pureCommentsCount - page * limit_perPage;
  //     return 0;
  //   } else {
  //     return skip;
  //   }
  // };

  // let lastPage = false;

  if (pureCommentsCount == 0) {
    return NextResponse.json({
      sortedComments: [],
      hasMore,
    });
  }

  const countOfItemsInLastPage =
    pureCommentsCount - limit_perPage * page + limit_perPage;

  if (countOfItemsInLastPage <= limit_perPage) {
    skip = 0;
    limit_perPage = countOfItemsInLastPage;
  }

  // if (countOfItemsInLastPage <= limit_perPage) {
  //   const comments = await Post.find(
  //     { _id: postid },
  //     {
  //       slicedComments: {
  //         $slice: ["$comments.comments", 0, countOfItemsInLastPage],
  //       },
  //       _id: false,
  //     }
  //   );

  //   // console.log("0 0 0 0 vvvv ", comments);

  //   const __sortedComments = comments[0]._doc.slicedComments;

  //   const sortedComments = __sortedComments.sort((a, b) => {
  //     return new Date(b.updatedAt) - new Date(a.updatedAt);
  //   });

  //   // console.log("sortedComments", sortedComments);

  //   // not worked
  //   // .sort({ "comments.comments.createdAt": -1 });

  //   return NextResponse.json({
  //     sortedComments,
  //     hasMore,
  //     comments,
  //   });
  // }

  // 0000000000000000000000
  const comments = await Post.find(
    { _id: postid },
    {
      slicedComments: {
        $slice: ["$comments.comments", skip, limit_perPage],
      },
      _id: false,
    }
  );

  // console.log("0 0 0 0 vvvv ", comments);

  const __sortedComments = comments[0]._doc.slicedComments;

  const sortedComments = __sortedComments.sort((a, b) => {
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });

  // console.log("sortedComments", sortedComments);

  // not worked
  // .sort({ "comments.comments.createdAt": -1 });

  return NextResponse.json({
    sortedComments,
    hasMore,
    comments,
  });
}

export async function POST(request) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ message: "You're Not Allowed To Do This" });
  }

  const { _id, _id_post, commentText, createdAt, updatedAt, user } =
    await request.json();

  if (!_id_post || !commentText) {
    return NextResponse.json({ message: "Failed to comment." });
  }

  await connectMongoDB();
  const data = await Post.updateOne(
    { _id: _id_post },
    { $push: { "comments.comments": { _id, commentText, updatedAt, user } } }
  );

  return NextResponse.json({
    data,
  });
}

export async function DELETE(request) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ message: "You're Not Allowed To Do This" });
  }

  const _id_post = request.nextUrl.searchParams.get("_id_post");
  const _id_comment = request.nextUrl.searchParams.get("_id_comment");

  // const XX = await request.json();
  // const { _id_post, _id_comment } = await request.json();

  // // console.log("XX", XX);

  if (!_id_post || !_id_comment) {
    return NextResponse.json({ message: "Failed to delete comment." });
  }

  await connectMongoDB();
  const data = await Post.updateOne(
    { _id: _id_post },
    { $pull: { "comments.comments": { _id: _id_comment } } }
  );

  return NextResponse.json({
    data,
  });
}
