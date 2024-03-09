"use client";
import React from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function SignInBtn() {
   return (
      <Link
         href="/"
         className="bg-[#207332] px-3 py-2 rounded-sm text-white hover:text-gray-200"
         onClick={() => signIn("google")}
      >
         sign in{" "}
      </Link>
   );
}
