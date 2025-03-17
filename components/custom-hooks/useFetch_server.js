export default async function useFetch_server(type, url, sentData) {
  let data = undefined;

  // const BASE_URL = "${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/";
  // if (!url.includes(BASE_URL)) {
  //   url = "${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/" + url;
  // }

  // GET
  if (type == "GET") {
    try {
      const res = await fetch(url, {
        cache: "no-store",
      });

      if (res.ok) {
        data = await res.json();
      }
    } catch (error) {
      // console.log("Error_GET: ", error);
      throw new Error("Error_GET");
    }
  }
  // POST
  if (type == "POST") {
    try {
      const res = await fetch(url, {
        cache: "no-store",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(sentData),
      });
      // // console.log("sentData::: ", sentData);

      if (res.ok) {
        data = await res.json();
        // console.log(data);
      }
    } catch (error) {
      // console.log("Error_POST: ", error);
      throw new Error("Error_POST");
    }
  }
  // PUT
  if (type == "PUT") {
    try {
      const res = await fetch(url, {
        cache: "no-store",
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(sentData),
      });

      if (res.ok) {
        data = await res.json();
      }
    } catch (error) {
      // console.log("Error_POST: ", error);
      throw new Error("Error_POST");
    }
  }
  // DELETE
  if (type == "DELETE") {
    try {
      const res = await fetch(url, {
        cache: "no-store",
        method: "DELETE",
      });

      if (res.ok) {
        data = await res.json();
      }
    } catch (error) {
      // console.log("Error_POST: ", error);
      throw new Error("Error_POST");
    }
  }

  return { data };
}
