import Link from "next/link"

export default function HowToPlayPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">How to Play Pinochle</h1>

        <div className="bg-blue-100 border-l-4 border-blue-500 p-6 mb-8">
          <p className="text-gray-800">
            <span className="font-semibold">New to Pinochle?</span> This guide will walk you through your first game step by step. For complete rules and scoring details, visit our <Link href="/rules" className="text-blue-600 hover:text-blue-800 underline">Rules page</Link>.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What You Need to Know</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">The Basics</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><span className="font-semibold">Teams:</span> Pinochle is played in teams of 2 (4-player) or 3 (6-player)</li>
                <li><span className="font-semibold">Goal:</span> Be the first team to reach 500 (or 1000) points</li>
                <li><span className="font-semibold">How to Score:</span> Through melding (card combinations) and winning tricks</li>
                <li><span className="font-semibold">The Deck:</span> 48 cards with duplicates (two of each 9, 10, J, Q, K, A in all suits)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Step-by-Step: Your First Game</h2>

          <div className="space-y-8">
            <div className="border-l-4 border-blue-500 pl-6">
              <div className="flex items-center mb-2">
                <span className="bg-blue-500 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">1</span>
                <h3 className="text-xl font-semibold text-gray-900">Getting Your Cards</h3>
              </div>
              <p className="text-gray-700 mb-2">
                The dealer gives everyone their cards. In 4-player Pinochle, you'll receive 12 cards. Look at your hand and organize it by suit.
              </p>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-600"><span className="font-semibold">Tip:</span> Arrange your cards by suit to easily spot potential melds!</p>
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-6">
              <div className="flex items-center mb-2">
                <span className="bg-green-500 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">2</span>
                <h3 className="text-xl font-semibold text-gray-900">The Bidding Phase</h3>
              </div>
              <p className="text-gray-700 mb-2">
                Players take turns bidding or passing. A bid is your team's promise of how many points you'll score this round.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-2">
                <li>Bidding starts at 20 (or 25) and goes up by 1</li>
                <li>Look at your potential melds before bidding</li>
                <li>If you pass, you're out of the bidding</li>
                <li>The highest bidder wins and chooses trump</li>
              </ul>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-600"><span className="font-semibold">Beginner Tip:</span> Start conservative! Count your meld points first. If you have 8-10 meld points, a bid around 25-30 is reasonable.</p>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-6">
              <div className="flex items-center mb-2">
                <span className="bg-purple-500 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">3</span>
                <h3 className="text-xl font-semibold text-gray-900">Declaring Trump</h3>
              </div>
              <p className="text-gray-700 mb-2">
                The winning bidder names the trump suit. Trump cards beat all other suits.
              </p>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-600"><span className="font-semibold">Tip:</span> Choose the suit where you have the most cards, especially high cards like Aces and 10s.</p>
              </div>
            </div>

            <div className="border-l-4 border-yellow-500 pl-6">
              <div className="flex items-center mb-2">
                <span className="bg-yellow-500 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">4</span>
                <h3 className="text-xl font-semibold text-gray-900">Melding</h3>
              </div>
              <p className="text-gray-700 mb-3">
                Everyone lays down their meld combinations to score points. Here are the most common melds beginners should look for:
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-3">
                <p className="font-semibold text-gray-900 mb-2">Easy Melds to Spot:</p>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• <span className="font-semibold">Marriage:</span> King + Queen of same suit (4 points in trump, 2 in other suits)</li>
                  <li>• <span className="font-semibold">Pinochle:</span> Queen of Spades + Jack of Diamonds (4 points)</li>
                  <li>• <span className="font-semibold">Aces Around:</span> One Ace of each suit (10 points)</li>
                  <li>• <span className="font-semibold">Run:</span> A-10-K-Q-J all in trump (15 points - this is good!)</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-600"><span className="font-semibold">Important:</span> You can use the same card in multiple melds! For example, a Queen can be part of both a marriage and "Queens Around".</p>
              </div>
            </div>

            <div className="border-l-4 border-red-500 pl-6">
              <div className="flex items-center mb-2">
                <span className="bg-red-500 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">5</span>
                <h3 className="text-xl font-semibold text-gray-900">Playing Tricks</h3>
              </div>
              <p className="text-gray-700 mb-2">
                Now the real game begins! The bidder leads the first trick by playing any card.
              </p>

              <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-3">
                <p className="font-semibold text-gray-900 mb-2">Rules for Playing:</p>
                <ol className="space-y-2 text-gray-700 text-sm list-decimal list-inside">
                  <li><span className="font-semibold">Follow Suit:</span> If someone plays Hearts, you must play Hearts if you have any</li>
                  <li><span className="font-semibold">Play Higher:</span> If you can follow suit, you must try to play a higher card</li>
                  <li><span className="font-semibold">Trump In:</span> If you can't follow suit, play trump if you have it</li>
                  <li><span className="font-semibold">Otherwise:</span> If you can't follow suit or trump, play any card</li>
                </ol>
              </div>

              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Who wins the trick?</span> The highest card of the suit that was led, unless someone played trump (then highest trump wins).
              </p>

              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-600"><span className="font-semibold">Remember:</span> Card ranking is A, 10, K, Q, J, 9 (10 is higher than King!)</p>
              </div>
            </div>

            <div className="border-l-4 border-indigo-500 pl-6">
              <div className="flex items-center mb-2">
                <span className="bg-indigo-500 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">6</span>
                <h3 className="text-xl font-semibold text-gray-900">Counting Points</h3>
              </div>
              <p className="text-gray-700 mb-3">
                After all tricks are played, count your team's points:
              </p>

              <div className="space-y-2 mb-3">
                <div className="flex justify-between items-center bg-gray-50 p-2 rounded">
                  <span className="text-gray-700">Meld points (from step 4)</span>
                  <span className="font-semibold text-gray-900">+ Your melds</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 p-2 rounded">
                  <span className="text-gray-700">Trick points (Aces, 10s, Kings = 1 each)</span>
                  <span className="font-semibold text-gray-900">+ Trick cards</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 p-2 rounded">
                  <span className="text-gray-700">Last trick bonus</span>
                  <span className="font-semibold text-gray-900">+ 1 point</span>
                </div>
                <div className="flex justify-between items-center bg-blue-100 p-2 rounded border-2 border-blue-300">
                  <span className="text-gray-900 font-semibold">= Total Team Score</span>
                  <span className="font-bold text-blue-600">?? points</span>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded p-3">
                <p className="text-sm text-gray-700"><span className="font-semibold">Critical Rule:</span> If the bidding team doesn't reach their bid, they score ZERO and lose the bid amount! This is called "going set."</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Beginner Mistakes</h2>

          <div className="space-y-4">
            <div className="flex">
              <span className="text-2xl mr-3">❌</span>
              <div>
                <p className="font-semibold text-gray-900">Overbidding</p>
                <p className="text-gray-700">Don't bid more than your melds + reasonable trick expectations. It's better to be safe!</p>
              </div>
            </div>

            <div className="flex">
              <span className="text-2xl mr-3">❌</span>
              <div>
                <p className="font-semibold text-gray-900">Forgetting to follow suit</p>
                <p className="text-gray-700">Always follow the suit that was led if you have it in your hand.</p>
              </div>
            </div>

            <div className="flex">
              <span className="text-2xl mr-3">❌</span>
              <div>
                <p className="font-semibold text-gray-900">Not counting cards</p>
                <p className="text-gray-700">Try to remember which cards have been played, especially high cards and trump.</p>
              </div>
            </div>

            <div className="flex">
              <span className="text-2xl mr-3">❌</span>
              <div>
                <p className="font-semibold text-gray-900">Playing alone</p>
                <p className="text-gray-700">Work with your partner! Help them win tricks when they're trying to make the bid.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Reference</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Card Values (Tricks)</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>Ace = 1 point</li>
                <li>Ten = 1 point</li>
                <li>King = 1 point</li>
                <li>Queen, Jack, 9 = 0 points</li>
                <li>Last trick = 1 point</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Common Melds</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>Run (A-10-K-Q-J trump) = 15</li>
                <li>Aces Around = 10</li>
                <li>Kings Around = 8</li>
                <li>Marriage (trump) = 4</li>
                <li>Pinochle = 4</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-md p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Play?</h2>
          <p className="mb-6">
            Now that you know the basics, jump into a game and start practicing!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Create Account
            </Link>
            <Link
              href="/rules"
              className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition border-2 border-white"
            >
              View Full Rules
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
