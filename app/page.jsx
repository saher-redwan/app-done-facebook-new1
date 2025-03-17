import MainContainer from "@/components/basic-items/MainContainer";
import MainLinksMenu from "@/components/basic-items/MainLinksMenu";
import PostsList from "@/components/posts-section/PostsList";
// import Post from "@/models/Post";
// import { getServerSession } from "next-auth";

export default async function Home() {
  // const session = await getServerSession();

  // console.log("session.user:: :: ::", session?.user);

  // try {
  //   // await Post.updateMany(
  //   //   {}, // Empty filter to update all Posts
  //   //   { $set: { [`${publisher}`]: "Shark 99" } }, // Update the specified property
  //   //   { arrayFilters: [] } // Empty array filter (optional if not filtering Posts)
  //   // );
  //   // // console.log(`Successfully updated ${propertyName} for all Posts.`);
  // } catch (error) {
  //   console.error("Error updating posts::::", error.message);
  // }

  return (
    <main>
      <div>
        <div className="">
          <MainContainer>
            <PostsList />
          </MainContainer>
        </div>
      </div>
    </main>
  );
}
