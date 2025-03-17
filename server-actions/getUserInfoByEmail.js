// note it work as server function without put line below
"use server";

import fetchData from "@/components/custom-hooks/fetchData";

export default async function getUserInfoByEmail(email) {
  // console.log("000 000 getUserInfoByEmail");

  const { data } = await fetchData(
    "POST",
    `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/findUserByEmail`,
    {
      email,
    }
  );
  // console.log("DATA::::::", data);
  delete data?.password;
  return data;
}
