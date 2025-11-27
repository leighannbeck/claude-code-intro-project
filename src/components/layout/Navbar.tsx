"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

export default function Navbar() {
  const { data: session, status } = useSession()

  return (
    <nav className="bg-gradient-to-r from-green-900 via-green-800 to-green-900 text-white shadow-2xl border-b-4 border-red-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-18">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-3xl font-bold text-white hover:text-red-300 transition drop-shadow-lg py-4">
              ♠ ♥ Pinochle Online ♦ ♣
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link href="/rules" className="text-white hover:text-red-300 transition font-bold text-lg">
                Rules
              </Link>
              <Link href="/how-to-play" className="text-white hover:text-blue-300 transition font-bold text-lg">
                How to Play
              </Link>
              <Link href="/about" className="text-white hover:text-yellow-300 transition font-bold text-lg">
                About
              </Link>
              <Link href="/contact" className="text-white hover:text-green-300 transition font-bold text-lg">
                Contact
              </Link>
              {session && (
                <>
                  <Link href="/play/lobby" className="text-white hover:text-blue-300 transition font-bold text-lg">
                    ♣ Play Now
                  </Link>
                  <Link href="/stats" className="text-white hover:text-yellow-300 transition font-bold text-lg">
                    My Stats
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {status === "loading" ? (
              <div className="text-white font-bold">Loading...</div>
            ) : session ? (
              <>
                <span className="text-white font-bold text-lg">
                  Welcome, {session.user.name} ♥
                </span>
                <button
                  onClick={() => signOut()}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-6 py-2 rounded-lg transition font-bold border-2 border-red-900 shadow-lg"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="text-white hover:text-blue-300 transition font-bold text-lg border-b-2 border-transparent hover:border-blue-300"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-6 py-2 rounded-lg transition font-bold border-2 border-blue-900 shadow-lg"
                >
                  ♠ Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
