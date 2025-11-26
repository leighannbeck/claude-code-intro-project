import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About Pinochle Online</h1>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            Pinochle Online was created to bring the classic card game of Pinochle to the digital age. Our mission is to provide a platform where players from around the world can enjoy this timeless game, whether they're seasoned veterans or complete beginners.
          </p>
          <p className="text-gray-700">
            We believe that Pinochle is more than just a card game—it's a social experience that brings people together, challenges the mind, and creates lasting memories. Our platform is designed to preserve the traditional gameplay while adding modern conveniences like real-time multiplayer, statistics tracking, and comprehensive learning resources.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Pinochle?</h2>
          <p className="text-gray-700 mb-4">
            Pinochle has been a beloved card game for generations, combining elements of strategy, memory, and teamwork. Unlike many card games, Pinochle rewards both individual skill and collaborative play, making it perfect for friends and families.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Strategic Depth</h3>
              <p className="text-gray-700 text-sm">
                Every hand presents new challenges. From bidding to melding to trick-taking, you'll need to think several steps ahead.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Team Play</h3>
              <p className="text-gray-700 text-sm">
                Success requires coordination with your partner. Learn to read signals and work together to achieve your goals.
              </p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Mental Exercise</h3>
              <p className="text-gray-700 text-sm">
                Keep your mind sharp by tracking cards, calculating probabilities, and planning your strategy.
              </p>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Social Connection</h3>
              <p className="text-gray-700 text-sm">
                Connect with friends, family, and players worldwide. Build communities and friendships through shared gameplay.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Offer</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-blue-100 rounded-full p-2 mr-4 mt-1">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Real-Time Multiplayer</h3>
                <p className="text-gray-700">Play with friends or join public games. Our platform supports both 4-player and 6-player variants with seamless real-time gameplay.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-green-100 rounded-full p-2 mr-4 mt-1">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Comprehensive Learning Resources</h3>
                <p className="text-gray-700">From beginner guides to advanced strategies, we provide everything you need to learn and master Pinochle.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-purple-100 rounded-full p-2 mr-4 mt-1">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Statistics & Progress Tracking</h3>
                <p className="text-gray-700">Track your wins, analyze your gameplay, and compete on leaderboards to see how you stack up against other players.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-yellow-100 rounded-full p-2 mr-4 mt-1">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Community Features</h3>
                <p className="text-gray-700">Create private game rooms, invite friends, and build your Pinochle community online.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">The History of Pinochle</h2>
          <p className="text-gray-700 mb-4">
            Pinochle originated in Europe in the mid-19th century, with roots tracing back to the German game Bezique and the French game Binokel. The game made its way to the United States with German immigrants and quickly became a beloved pastime.
          </p>
          <p className="text-gray-700 mb-4">
            Throughout the 20th century, Pinochle was especially popular in immigrant communities and working-class households. The game's unique combination of luck and skill, along with its social nature, made it perfect for family gatherings and social clubs.
          </p>
          <p className="text-gray-700">
            Today, Pinochle continues to thrive as both a traditional card game and a digital experience. Our platform honors the game's rich history while making it accessible to a new generation of players.
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-md p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
          <p className="mb-6">
            Whether you're a Pinochle veteran or have never played before, we welcome you to join our growing community of players.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Get Started
            </Link>
            <Link
              href="/how-to-play"
              className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition border-2 border-white"
            >
              Learn to Play
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
