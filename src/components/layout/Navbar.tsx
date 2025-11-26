"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

export default function Navbar() {
  const { data: session, status } = useSession()

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-blue-400 hover:text-blue-300">
              Pinochle Online
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link href="/rules" className="hover:text-blue-300 transition">
                Rules
              </Link>
              <Link href="/how-to-play" className="hover:text-blue-300 transition">
                How to Play
              </Link>
              {session && (
                <>
                  <Link href="/lobby" className="hover:text-blue-300 transition">
                    Game Lobby
                  </Link>
                  <Link href="/stats" className="hover:text-blue-300 transition">
                    My Stats
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {status === "loading" ? (
              <div className="text-gray-400">Loading...</div>
            ) : session ? (
              <>
                <span className="text-gray-300">
                  Welcome, {session.user.name}
                </span>
                <button
                  onClick={() => signOut()}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="hover:text-blue-300 transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
