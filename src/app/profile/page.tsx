"use client";
import { ModeToggle } from "@/components/mode-toggle";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button";

function Page() {
  const [data, setData] = useState("Default");

  const router = useRouter();

  const logout = async () => {
    try {
      const res = await axios.post("/api/users/logout");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data.data);
      const val: string = res.data.data.username;
      setData(val);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };
  fetchData();
  // useEffect(() => {
  //   fetchData();
  // }, []);
  return (
    <div className="min-h-screen flex flex-col gap-4 justify-center items-center">
      <Toaster />
      <h1 className="text-3xl">Hi, {data}</h1>
      <Link
        className="hover:underline underline-offset-2"
        href={`/profile/${data}`}
      >
        Click Me
      </Link>
      <Button onClick={logout}>Logout</Button>
      <ModeToggle />
    </div>
  );
}

export default Page;
