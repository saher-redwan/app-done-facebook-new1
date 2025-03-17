import EditTaskForm from "@/components/posts-section/EditTaskForm";
import fetchData from "@/components/custom-hooks/fetchData";

const getTaskById = async (id) => {
  try {
    const { data } = await fetchData(
      "GET",
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/posts/${id}`
    );

    if (data) {
      return data;
    }

    throw new Error("Failed to fetch Task");
  } catch (error) {
    // console.log(error);
  }
};

export default async function EditTask({ params }) {
  const { id } = params;
  const { post } = await getTaskById(id);
  const { title, description } = post;

  return (
    <>
      <EditTaskForm id={id} title={title} description={description} />
    </>
  );
}
