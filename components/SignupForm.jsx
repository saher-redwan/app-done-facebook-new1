"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState();

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);
    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ formData }),
      "content-type": "application/json",
    });

    if (res.ok) {
      // router.refresh();
      router.push("/");
    } else {
      const response = await res.json();
      setErrorMessage(response.message);
    }
    setLoading(false);
  };
  

  return (
    <>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col gap-3 w-1/2"
      >
        <h1>Create New User</h1>
        <label>Full Name</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.name}
          className="m-2 bg-slate-400 rounded"
        />
        <label>Email</label>
        <input
          id="email"
          name="email"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.email}
          className="m-2 bg-slate-400 rounded"
        />
        <label>Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={handleChange}
          required={true}
          value={formData.password}
          className="m-2 bg-slate-400 rounded"
        />
        <input
          type="submit"
          value={`Create User ${loading ? "loading..." : ""}`}
          className="bg-blue-300 hover:bg-blue-100"
          disabled={loading}
        />
      </form>
      <p className="text-red-500">{errorMessage}</p>
    </>
  );
}
