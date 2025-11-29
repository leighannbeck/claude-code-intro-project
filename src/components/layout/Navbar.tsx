"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

export default function Navbar() {
  const { data: session, status } = useSession()

  return (
    <nav className="bg-gradient-to-r from-[#243CBF] via-[#BF1736] to-[#243CBF] text-white shadow-2xl border-b-4 border-[#A67D4B]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-18">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-3xl font-bold text-white hover:text-[#A67D4B] transition drop-shadow-lg py-4">
              ♠ ♥ Pinochle Online ♦ ♣
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link href="/rules" className="text-white hover:text-[#A67D4B] transition font-bold text-lg">
                Rules
              </Link>
              <Link href="/how-to-play" className="text-white hover:text-[#A67D4B] transition font-bold text-lg">
                How to Play
              </Link>
              <Link href="/about" className="text-white hover:text-[#A67D4B] transition font-bold text-lg">
                About
              </Link>
              <Link href="/contact" className="text-white hover:text-[#A67D4B] transition font-bold text-lg">
                Contact
              </Link>
              {session && (
                <>
                  <Link href="/play/lobby" className="text-white hover:text-[#A67D4B] transition font-bold text-lg">
                    ♣ Play Now
                  </Link>
                  <Link href="/stats" className="text-white hover:text-[#A67D4B] transition font-bold text-lg">
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
                  className="bg-[#BF1736] hover:bg-[#2944D9] px-6 py-2 rounded-lg transition font-bold border-2 border-gray-900 shadow-lg"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="text-white hover:text-[#A67D4B] transition font-bold text-lg border-b-2 border-transparent hover:border-[#A67D4B]"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-[#BF1736] hover:bg-[#2944D9] px-6 py-2 rounded-lg transition font-bold border-2 border-gray-900 shadow-lg"
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
