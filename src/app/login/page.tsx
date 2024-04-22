"use client";
import React, { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type Props = {};

function Page({}: Props) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleClick = async () => {
    const id = toast.loading("Loading");
    try {
      await axios.post("/api/users/login", data);
      toast.dismiss(id);
      toast.success("success");
      router.push("/profile");
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
      <Button
        onClick={handleClick}
        className="mt-2 border border-white p-2 hover:bg-white hover:text-black duration-150 ease-in-out"
      >
        Login
      </Button>
    </div>
  );
}

export default Page;
