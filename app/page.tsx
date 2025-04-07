"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  const { data: session, status } = useSession();

  // Handle loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p>Loading session...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold mb-4 text-black">
        Analytics & Reporting Tool
      </h1>

      {/* If no user session: prompt for sign in */}
      {!session ? (
        <div className="text-black">
          <p className="mb-4">You are not signed in.</p>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={() => signIn()}
          >
            Sign In
          </button>
        </div>
      ) : (
        // If the user is signed in: show welcome message and actions
        <div className="text-black">
          <p className="mb-4">
            Welcome, {session.user?.name || session.user?.email}!
          </p>
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition mr-4"
          >
            Go to Dashboard
          </Link>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Sign Out
          </button>
        </div>
      )}
    </motion.div>
  );
}
