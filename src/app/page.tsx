import Link from "next/link"

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to Pinochle Online
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            The classic card game brought to the digital age. Play with friends in real-time,
            learn the rules, and master your strategy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition"
            >
              Get Started
            </Link>
            <Link
              href="/rules"
              className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg text-lg font-semibold transition"
            >
              Learn the Rules
            </Link>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">🎴</div>
            <h3 className="text-xl font-bold mb-2">Real-Time Multiplayer</h3>
            <p className="text-gray-600">
              Play 4-player or 6-player team Pinochle with friends online in real-time.
              Create private rooms or join public games.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold mb-2">Learn & Improve</h3>
            <p className="text-gray-600">
              Comprehensive rules, strategies, and guides to help you master both
              4-player and 6-player variants.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-2">Track Your Stats</h3>
            <p className="text-gray-600">
              View your game history, win rate, and statistics. Compete on the
              leaderboard and improve your ranking.
            </p>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">What is Pinochle?</h2>
          <p className="text-gray-700 mb-4 max-w-3xl mx-auto">
            Pinochle is a classic trick-taking card game played with a special 48-card deck.
            It combines elements of bidding, melding, and strategic play. Teams work together
            to score points through melds (special card combinations) and by winning tricks.
          </p>
          <p className="text-gray-700 mb-6 max-w-3xl mx-auto">
            The game requires skill, memory, and teamwork. Whether you're playing the traditional
            4-player partnership variant or the exciting 6-player team game, Pinochle offers
            endless strategic depth and entertainment.
          </p>
          <div className="text-center">
            <Link
              href="/how-to-play"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Learn How to Play →
            </Link>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Play?</h2>
          <p className="text-gray-600 mb-8">
            Join thousands of players enjoying Pinochle online. Create your free account today!
          </p>
          <Link
            href="/auth/signup"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition inline-block"
          >
            Sign Up Now
          </Link>
        </section>
      </div>
    </div>
  )
}
