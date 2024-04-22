"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import { useRouter as navRouter } from "next/navigation";

function page() {
  const [token, setToken] = useState("");

  const router = navRouter();

  const handleClick = async () => {
    try {
      await axios.post("/api/users/verifyemail", token);
      toast.success("Email verified");
      router.push("/profile");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const token = window.location.search.split("=")[1];
    if (typeof token === "string") {
      setToken(token);
    } else {
      setToken("");
    }
  }, []);
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Toaster />
      <button
        className="border border-white p-2 hover:bg-white hover:text-black duration-150 ease-in-out"
        onClick={handleClick}
      >
        Click to verify
      </button>
    </div>
  );
}

export default page;
