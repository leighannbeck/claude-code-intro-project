import Link from "next/link"

export default function HowToPlayPage() {
  return (
    <div className="bg-[#F2F2F2] min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Page Title Card */}
        <div className="bg-white rounded-xl shadow-2xl p-8 mb-8 border-8 border-[#243CBF] relative">
          <div className="absolute top-2 left-2 text-[#BF1736] text-3xl">♦</div>
          <div className="absolute top-2 right-2 text-[#A67D4B] text-3xl">♣</div>
          <h1 className="text-5xl font-bold text-gray-900 text-center">How to Play Pinochle</h1>
        </div>

        {/* Intro Box */}
        <div className="bg-blue-100 border-8 border-[#243CBF] rounded-xl p-6 mb-8 shadow-xl">
          <p className="text-gray-900 font-semibold text-lg text-center">
            <span className="text-[#243CBF] text-xl">♠</span> New to Pinochle? <span className="text-[#243CBF] text-xl">♠</span>
            <br />
            This guide will walk you through your first game step by step.
            <br />
            For complete rules and scoring details, visit our <Link href="/rules" className="text-[#243CBF] hover:text-[#2944D9] underline font-bold">Rules page</Link>.
          </p>
        </div>

        {/* What You Need to Know */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8 border-4 border-[#BF1736]">
          <h2 className="text-3xl font-bold text-red-900 mb-6 border-b-4 border-[#243CBF] pb-2">
            ♥ What You Need to Know
          </h2>

          <div className="bg-red-50 p-6 rounded-lg border-4 border-[#BF1736]">
            <h3 className="text-2xl font-bold text-red-900 mb-4">The Basics</h3>
            <ul className="list-none text-gray-900 space-y-3 text-lg font-medium">
              <li className="flex items-start">
                <span className="text-[#BF1736] mr-3 text-2xl">♥</span>
                <span><span className="font-bold">Teams:</span> Pinochle is played in teams of 2. In 4-player there are 2 teams, in 6-player there are 3 teams</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#243CBF] mr-3 text-2xl">♠</span>
                <span><span className="font-bold">Goal:</span> Be the first team to reach 500 points (default)</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#BF1736] mr-3 text-2xl">♦</span>
                <span><span className="font-bold">How to Score:</span> Through melding (card combinations) AND winning tricks</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#A67D4B] mr-3 text-2xl">♣</span>
                <span><span className="font-bold">The Deck:</span> Multiple decks without 9s (4-player uses 2 decks = 80 cards, 6-player uses 3 decks = 120 cards)</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#243CBF] mr-3 text-2xl">♠</span>
                <span><span className="font-bold text-blue-700">Key Rule:</span> 10s are the SECOND highest cards (they beat Kings!)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Step-by-Step Guide */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8 border-4 border-[#A67D4B]">
          <h2 className="text-3xl font-bold text-orange-900 mb-6 border-b-4 border-[#BF1736] pb-2">
            ♣ Step-by-Step: Your First Game
          </h2>

          <div className="space-y-8">
            {/* Step 1 */}
            <div className="border-l-8 border-[#243CBF] pl-6 bg-blue-50 p-6 rounded-r-lg">
              <div className="flex items-center mb-4">
                <span className="bg-[#243CBF] text-white font-bold rounded-full w-12 h-12 flex items-center justify-center mr-4 text-2xl shadow-lg">1</span>
                <h3 className="text-2xl font-bold text-blue-900">Getting Your Cards</h3>
              </div>
              <p className="text-gray-900 mb-3 text-lg font-medium">
                The dealer gives everyone their cards <span className="font-bold text-blue-700">4 at a time</span>, clockwise. In 4-player Pinochle, you'll receive 12 cards. Look at your hand and organize it by suit.
              </p>
              <div className="bg-blue-100 p-4 rounded-lg border-2 border-[#243CBF]">
                <p className="text-gray-900 font-medium"><span className="font-bold text-blue-700">♠ Tip:</span> Arrange your cards by suit to easily spot potential melds! Look for marriages (K+Q) - you need at least one to bid.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="border-l-8 border-[#A67D4B] pl-6 bg-orange-50 p-6 rounded-r-lg">
              <div className="flex items-center mb-4">
                <span className="bg-[#A67D4B] text-white font-bold rounded-full w-12 h-12 flex items-center justify-center mr-4 text-2xl shadow-lg">2</span>
                <h3 className="text-2xl font-bold text-orange-900">The Bidding Phase</h3>
              </div>
              <p className="text-gray-900 mb-3 text-lg font-medium">
                Players take turns bidding or passing. A bid is your team's promise of how many TOTAL points (meld + tricks) you'll score this round.
              </p>
              <ul className="list-none text-gray-900 space-y-2 mb-3 text-lg font-medium">
                <li className="flex items-start"><span className="text-[#A67D4B] mr-2">♣</span><span><span className="font-bold">Minimum bid: 50</span></span></li>
                <li className="flex items-start"><span className="text-[#A67D4B] mr-2">♣</span><span>Below 60: Increase by any amount</span></li>
                <li className="flex items-start"><span className="text-[#A67D4B] mr-2">♣</span><span>At 60+: Must increase by 5</span></li>
                <li className="flex items-start"><span className="text-[#A67D4B] mr-2">♣</span><span>No maximum bid</span></li>
                <li className="flex items-start"><span className="text-[#BF1736] mr-2">♥</span><span className="font-bold text-[#BF1736]">Must have at least one marriage (K+Q) to bid!</span></li>
                <li className="flex items-start"><span className="text-[#A67D4B] mr-2">♣</span><span>If you pass, you're out of the bidding</span></li>
                <li className="flex items-start"><span className="text-[#A67D4B] mr-2">♣</span><span>The highest bidder wins and chooses trump</span></li>
              </ul>
              <div className="bg-orange-100 p-4 rounded-lg border-2 border-[#A67D4B]">
                <p className="text-gray-900 font-medium"><span className="font-bold text-orange-800">♣ Beginner Tip:</span> Count your meld points first. The first bid around the table traditionally signals meld: add +1 for every 10 meld points. Example: 20 meld = bid 52 (50 + 2).</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="border-l-8 border-purple-600 pl-6 bg-purple-50 p-6 rounded-r-lg">
              <div className="flex items-center mb-4">
                <span className="bg-purple-600 text-white font-bold rounded-full w-12 h-12 flex items-center justify-center mr-4 text-2xl shadow-lg">3</span>
                <h3 className="text-2xl font-bold text-purple-900">Declaring Trump</h3>
              </div>
              <p className="text-gray-900 mb-3 text-lg font-medium">
                The winning bidder names the trump suit. Trump cards beat all other suits.
              </p>
              <div className="bg-red-100 p-4 rounded-lg border-4 border-[#BF1736]">
                <p className="text-red-900 font-bold text-lg mb-2">♥ CRITICAL:</p>
                <p className="text-gray-900 font-medium">You can ONLY call trump in a suit where you have a marriage (K+Q). If you can't call trump, your team automatically goes set (negative bid amount)!</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="border-l-8 border-yellow-600 pl-6 bg-yellow-50 p-6 rounded-r-lg">
              <div className="flex items-center mb-4">
                <span className="bg-yellow-600 text-white font-bold rounded-full w-12 h-12 flex items-center justify-center mr-4 text-2xl shadow-lg">4</span>
                <h3 className="text-2xl font-bold text-yellow-900">Melding</h3>
              </div>
              <p className="text-gray-900 mb-4 text-lg font-medium">
                Everyone lays down their meld combinations to score points. Here are the most common melds beginners should look for:
              </p>

              <div className="bg-blue-100 border-4 border-[#243CBF] rounded-lg p-4 mb-4">
                <p className="font-bold text-blue-900 mb-3 text-xl">♠ Easy Melds to Spot:</p>
                <ul className="space-y-2 text-gray-900 font-medium text-lg">
                  <li className="flex items-start"><span className="text-[#243CBF] mr-2">♠</span><span><span className="font-bold">Marriage:</span> King + Queen of same suit (4 points in trump, 2 in other suits)</span></li>
                  <li className="flex items-start"><span className="text-[#243CBF] mr-2">♠</span><span><span className="font-bold">Pinochle:</span> Queen of Spades + Jack of Diamonds (4 points)</span></li>
                  <li className="flex items-start"><span className="text-[#243CBF] mr-2">♠</span><span><span className="font-bold">Aces Around:</span> One Ace of each suit (10 points)</span></li>
                  <li className="flex items-start"><span className="text-[#243CBF] mr-2">♠</span><span><span className="font-bold">Run:</span> A-10-K-Q-J all in trump (15 points - this is good!)</span></li>
                </ul>
              </div>

              <div className="bg-purple-100 border-4 border-purple-600 rounded-lg p-4 mb-4">
                <p className="font-bold text-purple-900 mb-3 text-xl">Advanced Melds (Worth a Lot!):</p>
                <ul className="space-y-2 text-gray-900 font-medium text-lg">
                  <li className="flex items-start"><span className="text-purple-600 mr-2">♦</span><span><span className="font-bold">Double Pinochle:</span> 2 Q♠ + 2 J♦ (30 points)</span></li>
                  <li className="flex items-start"><span className="text-purple-600 mr-2">♦</span><span><span className="font-bold">Triple Pinochle:</span> 3 Q♠ + 3 J♦ (90 points!)</span></li>
                  <li className="flex items-start"><span className="text-purple-600 mr-2">♦</span><span><span className="font-bold">Double Run:</span> Two A-10-K-Q-J in trump (150 points!)</span></li>
                  <li className="flex items-start"><span className="text-purple-600 mr-2">♦</span><span><span className="font-bold">Double Aces/Kings/Queens/Jacks:</span> 2 of each rank in all suits (100/80/60/40 points)</span></li>
                </ul>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg border-2 border-gray-600">
                <p className="text-gray-900 font-medium"><span className="font-bold">Important:</span> You can use the same card in multiple melds! For example, a Queen can be part of both a marriage and "Queens Around".</p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="border-l-8 border-[#BF1736] pl-6 bg-red-50 p-6 rounded-r-lg">
              <div className="flex items-center mb-4">
                <span className="bg-[#BF1736] text-white font-bold rounded-full w-12 h-12 flex items-center justify-center mr-4 text-2xl shadow-lg">5</span>
                <h3 className="text-2xl font-bold text-red-900">Playing Tricks</h3>
              </div>
              <p className="text-gray-900 mb-3 text-lg font-medium">
                Now the real game begins! The bidder leads the first trick by playing any card.
              </p>

              <div className="bg-yellow-100 border-4 border-yellow-600 rounded-lg p-4 mb-4">
                <p className="font-bold text-yellow-900 mb-3 text-xl">Rules for Playing (STRICT):</p>
                <ol className="space-y-2 text-gray-900 font-medium list-decimal list-inside">
                  <li><span className="font-bold">Follow Suit:</span> If someone plays Hearts, you must play Hearts if you have any</li>
                  <li><span className="font-bold">Must Beat:</span> If you CAN beat the current highest card, you MUST (even if it beats your partner!)</li>
                  <li><span className="font-bold">Trump In:</span> If you can't follow suit, you MUST play trump if you have it</li>
                  <li><span className="font-bold">Must Beat with Trump:</span> If you're playing trump and can beat, you must</li>
                  <li><span className="font-bold">Otherwise:</span> Only if you can't follow suit or trump, play any card</li>
                </ol>
              </div>

              <p className="text-gray-900 mb-3 text-lg font-medium">
                <span className="font-bold text-[#BF1736]">♥ Who wins the trick?</span> The highest card of the suit that was led, unless someone played trump (then highest trump wins).
              </p>

              <div className="bg-blue-100 p-4 rounded-lg mb-3 border-2 border-[#243CBF]">
                <p className="text-gray-900 font-bold text-lg mb-2">Card Ranking:</p>
                <p className="text-gray-900 font-bold text-xl">A &gt; <span className="text-blue-700">10</span> &gt; K &gt; Q &gt; J</p>
                <p className="text-[#BF1736] font-bold mt-1">Remember: 10 is higher than King!</p>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg border-2 border-gray-600">
                <p className="text-gray-900 font-medium"><span className="font-bold">Tie-breaker:</span> If the same card is played twice (e.g., two A♠), the first one played wins the trick.</p>
              </div>
            </div>

            {/* Step 6 */}
            <div className="border-l-8 border-indigo-600 pl-6 bg-indigo-50 p-6 rounded-r-lg">
              <div className="flex items-center mb-4">
                <span className="bg-indigo-600 text-white font-bold rounded-full w-12 h-12 flex items-center justify-center mr-4 text-2xl shadow-lg">6</span>
                <h3 className="text-2xl font-bold text-indigo-900">Counting Points</h3>
              </div>
              <p className="text-gray-900 mb-4 text-lg font-medium">
                After all tricks are played, count your team's points:
              </p>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center bg-red-100 p-3 rounded-lg border-2 border-[#BF1736]">
                  <span className="text-gray-900 font-medium">Meld points (from step 4)</span>
                  <span className="font-bold text-red-900 text-lg">+ Your melds</span>
                </div>
                <div className="flex justify-between items-center bg-blue-100 p-3 rounded-lg border-2 border-[#243CBF]">
                  <span className="text-gray-900 font-medium">Trick points (Aces, 10s, Kings = 1 each)</span>
                  <span className="font-bold text-blue-900 text-lg">+ Trick cards</span>
                </div>
                <div className="flex justify-between items-center bg-orange-100 p-3 rounded-lg border-2 border-[#A67D4B]">
                  <span className="text-gray-900 font-medium">Last trick bonus</span>
                  <span className="font-bold text-orange-900 text-lg">+ 2 pts (4-player) / 3 pts (6-player)</span>
                </div>
                <div className="flex justify-between items-center bg-purple-100 p-3 rounded-lg border-4 border-purple-600">
                  <span className="text-purple-900 font-bold text-lg">= Total Team Score</span>
                  <span className="font-bold text-purple-700 text-xl">?? points</span>
                </div>
              </div>

              <div className="bg-red-100 border-4 border-[#BF1736] rounded-lg p-4">
                <p className="text-red-900 font-bold text-lg mb-2">♥ Critical Rule - Going "Set":</p>
                <p className="text-gray-900 font-medium mb-2">If the bidding team's total (meld + tricks) is LESS than their bid, they score ZERO and their score goes DOWN by the bid amount (negative). This is called "going set."</p>
                <p className="text-gray-900 font-medium">Example: Bid 60, scored 55 = -60 points!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Common Beginner Mistakes */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8 border-4 border-[#BF1736]">
          <h2 className="text-3xl font-bold text-red-900 mb-6 border-b-4 border-[#243CBF] pb-2">
            ❌ Common Beginner Mistakes
          </h2>

          <div className="space-y-4">
            <div className="flex bg-red-50 p-4 rounded-lg border-l-4 border-[#BF1736]">
              <span className="text-3xl mr-4">❌</span>
              <div>
                <p className="font-bold text-red-900 text-lg">Bidding without a marriage</p>
                <p className="text-gray-900 font-medium">You MUST have at least one K+Q pair to bid. Check before bidding!</p>
              </div>
            </div>

            <div className="flex bg-blue-50 p-4 rounded-lg border-l-4 border-[#243CBF]">
              <span className="text-3xl mr-4">❌</span>
              <div>
                <p className="font-bold text-blue-900 text-lg">Calling trump in the wrong suit</p>
                <p className="text-gray-900 font-medium">Can only call trump where you have K+Q. Choose wisely!</p>
              </div>
            </div>

            <div className="flex bg-orange-50 p-4 rounded-lg border-l-4 border-[#A67D4B]">
              <span className="text-3xl mr-4">❌</span>
              <div>
                <p className="font-bold text-orange-900 text-lg">Not beating when you can</p>
                <p className="text-gray-900 font-medium">If you CAN beat the current highest card, you MUST - even if it beats your partner!</p>
              </div>
            </div>

            <div className="flex bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600">
              <span className="text-3xl mr-4">❌</span>
              <div>
                <p className="font-bold text-purple-900 text-lg">Forgetting to follow suit</p>
                <p className="text-gray-900 font-medium">Always follow the suit that was led if you have it in your hand.</p>
              </div>
            </div>

            <div className="flex bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-600">
              <span className="text-3xl mr-4">❌</span>
              <div>
                <p className="font-bold text-yellow-900 text-lg">Thinking Kings beat 10s</p>
                <p className="text-gray-900 font-medium">10s are the SECOND highest cards! A &gt; 10 &gt; K &gt; Q &gt; J</p>
              </div>
            </div>

            <div className="flex bg-red-50 p-4 rounded-lg border-l-4 border-[#BF1736]">
              <span className="text-3xl mr-4">❌</span>
              <div>
                <p className="font-bold text-red-900 text-lg">Overbidding</p>
                <p className="text-gray-900 font-medium">Count meld + realistic tricks. Going set is devastating!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Reference */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8 border-4 border-[#A67D4B]">
          <h2 className="text-3xl font-bold text-orange-900 mb-6 border-b-4 border-[#BF1736] pb-2">
            📋 Quick Reference
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg border-4 border-[#243CBF]">
              <h3 className="font-bold text-blue-900 mb-3 text-xl">♠ Card Values (Tricks)</h3>
              <ul className="text-gray-900 font-medium space-y-2">
                <li className="flex items-start"><span className="text-[#243CBF] mr-2">♠</span><span>Ace = 1 point</span></li>
                <li className="flex items-start"><span className="text-[#243CBF] mr-2">♠</span><span>Ten = 1 point</span></li>
                <li className="flex items-start"><span className="text-[#243CBF] mr-2">♠</span><span>King = 1 point</span></li>
                <li className="flex items-start"><span className="text-[#243CBF] mr-2">♠</span><span>Queen, Jack = 0 points</span></li>
                <li className="flex items-start"><span className="text-[#243CBF] mr-2">♠</span><span>Last trick = 2 pts (4-player) / 3 pts (6-player)</span></li>
              </ul>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg border-4 border-[#A67D4B]">
              <h3 className="font-bold text-orange-900 mb-3 text-xl">♣ Common Melds</h3>
              <ul className="text-gray-900 font-medium space-y-2">
                <li className="flex items-start"><span className="text-[#A67D4B] mr-2">♣</span><span>Run (A-10-K-Q-J trump) = 15</span></li>
                <li className="flex items-start"><span className="text-[#A67D4B] mr-2">♣</span><span>Aces Around = 10</span></li>
                <li className="flex items-start"><span className="text-[#A67D4B] mr-2">♣</span><span>Kings Around = 8</span></li>
                <li className="flex items-start"><span className="text-[#A67D4B] mr-2">♣</span><span>Marriage (trump) = 4</span></li>
                <li className="flex items-start"><span className="text-[#A67D4B] mr-2">♣</span><span>Marriage (non-trump) = 2</span></li>
                <li className="flex items-start"><span className="text-[#A67D4B] mr-2">♣</span><span>Pinochle = 4</span></li>
              </ul>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg border-4 border-purple-600">
              <h3 className="font-bold text-purple-900 mb-3 text-xl">♦ Bidding Rules</h3>
              <ul className="text-gray-900 font-medium space-y-2">
                <li className="flex items-start"><span className="text-purple-600 mr-2">♦</span><span>Minimum bid: 50</span></li>
                <li className="flex items-start"><span className="text-purple-600 mr-2">♦</span><span>Below 60: Any increment</span></li>
                <li className="flex items-start"><span className="text-purple-600 mr-2">♦</span><span>At 60+: Must increment by 5</span></li>
                <li className="flex items-start"><span className="text-purple-600 mr-2">♦</span><span>No maximum bid</span></li>
                <li className="flex items-start"><span className="text-[#BF1736] mr-2">♥</span><span className="font-bold text-[#BF1736]">Must have marriage to bid!</span></li>
              </ul>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg border-4 border-yellow-600">
              <h3 className="font-bold text-yellow-900 mb-3 text-xl">Card Ranking</h3>
              <p className="text-2xl font-bold text-gray-900 mb-2">A &gt; 10 &gt; K &gt; Q &gt; J</p>
              <p className="text-[#BF1736] font-bold">10 beats King!</p>
            </div>
          </div>
        </div>

        {/* Ready to Play CTA */}
        <div className="bg-gradient-to-r from-[#BF1736] via-[#243CBF] to-[#A67D4B] rounded-xl shadow-2xl p-8 text-white text-center border-4 border-white">
          <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">♠ ♥ Ready to Play? ♦ ♣</h2>
          <p className="mb-6 text-xl font-semibold drop-shadow">
            Now that you know the basics, jump into a game and start practicing!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="bg-white text-[#BF1736] px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition text-lg shadow-2xl border-4 border-[#BF1736]"
            >
              Create Account
            </Link>
            <Link
              href="/rules"
              className="bg-[#243CBF] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#2944D9] transition border-4 border-white text-lg shadow-2xl"
            >
              View Full Rules
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
