"use client";
import React, { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {};

function page({}: Props) {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleClick = async () => {
    const id = toast.loading("Loading");
    try {
      await axios.post("api/users/register", data);
      toast.success("success");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(id);
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-4 justify-center items-center">
      <Toaster />
      <div className="flex flex-col gap-2">
        <label className="text-sm" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          type="text"
          onChange={(e) => setData({ ...data, username: e.target.value })}
          className="bg-inherit border border-white p-2"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="text"
          onChange={(e) => setData({ ...data, email: e.target.value })}
          className="bg-inherit border border-white p-2"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="text"
          onChange={(e) => setData({ ...data, password: e.target.value })}
          className="bg-inherit border border-white p-2"
        />
      </div>
      <button
        onClick={handleClick}
        className="mt-2 border border-white p-2 hover:bg-white hover:text-black duration-150 ease-in-out"
      >
        Register
      </button>
    </div>
  );
}

export default page;
