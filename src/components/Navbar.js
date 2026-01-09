"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b">
      {/* LEFT SIDE */}
      <Link href="/" className="text-xl font-bold">
        My App
      </Link>

      {/* RIGHT SIDE */}
      <div>
        {status === "loading" ? null : session ? (
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-black text-white rounded"
            >
              Dashboard
            </Link>
            <LogoutButton />
          </div>
        ) : (
          <Link href="/login" className="px-4 py-2 bg-black text-white rounded">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
