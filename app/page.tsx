"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { motion } from "framer-motion";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl text-black font-bold mb-4">
        {" "}
        Analytics & Reporting Tool
      </h1>
      {!session ? (
        <>
          <p className="mb-4 text-black">
            Please SIGN IN to access your dashboard.
          </p>
          <button
            onClick={() => signIn()}
            className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </>
      ) : (
        <>
          <p className="mb-4">
            Welcome, {session.user?.name || session.user?.email}!
          </p>
          <a
            href="/dashboard"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Go to Dashboard
          </a>
          <button
            onClick={() => signOut()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          ></button>
        </>
      )}
    </motion.div>
  );
}
