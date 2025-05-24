"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export function Button() {
  const { status } = useSession();

  console.log(status);

  return (
    <>
      {status === "unauthenticated" ? (
        <button
          className="px-4 py-2 bg-lime-400 rounded-full text-black font-bold hidden md:block"
          onClick={() => {
            signIn();
          }}
        >
          Log In
        </button>
      ) : (
        <button
          className="px-4 py-2 bg-lime-400 rounded-full text-black font-bold hidden md:block"
          onClick={() => {
            signOut();
          }}
        >
          Log Out
        </button>
      )}
    </>
  );
}
