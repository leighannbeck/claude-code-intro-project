import Link from "next/link"

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 min-h-screen">
      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,currentColor_10px,currentColor_20px)]"></div>

      <div className="relative container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="bg-white rounded-xl shadow-2xl p-8 border-8 border-red-700 relative">
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-blue-600 rounded-tl-xl"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-red-600 rounded-tr-xl"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-red-600 rounded-bl-xl"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-blue-600 rounded-br-xl"></div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 drop-shadow-sm">
              🂡 Pinochle Online 🂮
            </h1>
            <p className="text-xl md:text-2xl text-gray-800 font-semibold mb-8 max-w-2xl mx-auto">
              The Classic Card Game • Real-Time Multiplayer • Master Your Strategy
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/signup"
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-4 rounded-lg text-lg font-bold transition shadow-lg border-2 border-red-900"
              >
                ♠ Get Started ♥
              </Link>
              <Link
                href="/rules"
                className="bg-white hover:bg-gray-100 text-blue-700 border-4 border-blue-700 px-10 py-4 rounded-lg text-lg font-bold transition shadow-lg"
              >
                ♦ Learn the Rules ♣
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Feature 1 - Red themed */}
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden border-4 border-red-700">
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 border-b-4 border-red-900">
              <div className="text-5xl mb-2 text-center">♥</div>
              <h3 className="text-2xl font-bold text-center">Real-Time Multiplayer</h3>
            </div>
            <div className="p-6 bg-red-50">
              <p className="text-gray-900 font-medium text-center">
                Play 4-player or 6-player team Pinochle with friends online in real-time.
                Create private rooms or join public games.
              </p>
            </div>
          </div>

          {/* Feature 2 - Blue themed */}
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden border-4 border-blue-700">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 border-b-4 border-blue-900">
              <div className="text-5xl mb-2 text-center">♠</div>
              <h3 className="text-2xl font-bold text-center">Learn & Improve</h3>
            </div>
            <div className="p-6 bg-blue-50">
              <p className="text-gray-900 font-medium text-center">
                Comprehensive rules, strategies, and guides to help you master both
                4-player and 6-player variants.
              </p>
            </div>
          </div>

          {/* Feature 3 - Green themed */}
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden border-4 border-green-700">
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 border-b-4 border-green-900">
              <div className="text-5xl mb-2 text-center">♣</div>
              <h3 className="text-2xl font-bold text-center">Track Your Stats</h3>
            </div>
            <div className="p-6 bg-green-50">
              <p className="text-gray-900 font-medium text-center">
                View your game history, win rate, and statistics. Compete on the
                leaderboard and improve your ranking.
              </p>
            </div>
          </div>
        </section>

        {/* What is Pinochle - Card-style */}
        <section className="bg-white rounded-xl shadow-2xl p-10 mb-16 border-8 border-blue-700 relative">
          {/* Corner decorations */}
          <div className="absolute top-2 left-2 text-red-600 text-3xl">♦</div>
          <div className="absolute top-2 right-2 text-blue-600 text-3xl">♠</div>
          <div className="absolute bottom-2 left-2 text-blue-600 text-3xl">♣</div>
          <div className="absolute bottom-2 right-2 text-red-600 text-3xl">♥</div>

          <h2 className="text-4xl font-bold mb-6 text-center text-gray-900 border-b-4 border-red-600 pb-4">
            What is Pinochle?
          </h2>
          <p className="text-gray-900 text-lg font-medium mb-4 max-w-3xl mx-auto leading-relaxed">
            Pinochle is a classic trick-taking card game played with a special 48-card deck.
            It combines elements of bidding, melding, and strategic play. Teams work together
            to score points through melds (special card combinations) and by winning tricks.
          </p>
          <p className="text-gray-900 text-lg font-medium mb-6 max-w-3xl mx-auto leading-relaxed">
            The game requires skill, memory, and teamwork. Whether you're playing the traditional
            4-player partnership variant or the exciting 6-player team game, Pinochle offers
            endless strategic depth and entertainment.
          </p>
          <div className="text-center">
            <Link
              href="/how-to-play"
              className="text-blue-700 hover:text-blue-900 font-bold text-xl border-b-2 border-blue-700 hover:border-blue-900 transition"
            >
              Learn How to Play →
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-red-700 via-blue-700 to-green-700 rounded-xl shadow-2xl p-12 border-4 border-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">
            Ready to Play?
          </h2>
          <p className="text-xl text-white font-semibold mb-8 drop-shadow">
            Join thousands of players enjoying Pinochle online. Create your free account today!
          </p>
          <Link
            href="/auth/signup"
            className="bg-white hover:bg-gray-100 text-red-700 px-12 py-4 rounded-lg text-xl font-bold transition inline-block shadow-2xl border-4 border-red-700"
          >
            ♠ ♥ Sign Up Now ♦ ♣
          </Link>
        </section>
      </div>
    </div>
  )
}
