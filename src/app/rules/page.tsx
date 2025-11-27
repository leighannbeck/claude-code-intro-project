export default function RulesPage() {
  return (
    <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Page Title Card */}
        <div className="bg-white rounded-xl shadow-2xl p-8 mb-8 border-8 border-red-700 relative">
          <div className="absolute top-2 left-2 text-red-600 text-3xl">♥</div>
          <div className="absolute top-2 right-2 text-blue-600 text-3xl">♠</div>
          <h1 className="text-5xl font-bold text-gray-900 text-center">Pinochle Rules</h1>
        </div>

        {/* Overview */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-6 border-4 border-blue-700">
          <h2 className="text-3xl font-bold text-blue-900 mb-4 border-b-4 border-red-600 pb-2">♠ Overview</h2>
          <p className="text-gray-900 font-medium text-lg leading-relaxed">
            Pinochle is a trick-taking card game played with multiple decks (without 9s). The game combines bidding, melding, and trick-taking elements, requiring both strategy and teamwork. Teams work together to score points through meld combinations and winning tricks.
          </p>
        </div>

        {/* The Deck */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-6 border-4 border-red-700">
          <h2 className="text-3xl font-bold text-red-900 mb-4 border-b-4 border-blue-600 pb-2">♥ The Deck</h2>
          <p className="text-gray-900 font-medium text-lg mb-4">
            The Pinochle deck varies by number of players:
          </p>
          <ul className="list-none text-gray-900 space-y-3 ml-4 text-lg font-medium">
            <li className="flex items-start"><span className="text-red-600 mr-2">♦</span><span><span className="font-bold">4-player:</span> 2 decks (80 cards total)</span></li>
            <li className="flex items-start"><span className="text-blue-600 mr-2">♠</span><span><span className="font-bold">6-player:</span> 3 decks (120 cards total)</span></li>
            <li className="flex items-start"><span className="text-red-600 mr-2">♥</span><span>Each deck contains two of each: 10, Jack, Queen, King, Ace (NO 9s)</span></li>
            <li className="flex items-start"><span className="text-green-700 mr-2">♣</span><span>In all four suits: Spades ♠, Hearts ♥, Diamonds ♦, Clubs ♣</span></li>
          </ul>
          <div className="mt-6 p-6 bg-blue-50 rounded-lg border-4 border-blue-600">
            <p className="text-gray-900 font-bold text-xl mb-2">Card Ranking (High to Low):</p>
            <p className="text-gray-900 text-2xl font-bold">Ace &gt; <span className="text-blue-700">10</span> &gt; King &gt; Queen &gt; Jack</p>
            <p className="text-red-700 font-bold mt-2 text-lg">Important: 10s are the SECOND highest cards, beating Kings!</p>
          </div>
        </div>

        {/* Game Variants */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-6 border-4 border-green-700">
          <h2 className="text-3xl font-bold text-green-900 mb-6 border-b-4 border-red-600 pb-2">♣ Game Variants</h2>

          <div className="mb-8 bg-red-50 p-6 rounded-lg border-2 border-red-600">
            <h3 className="text-2xl font-bold text-red-900 mb-4 flex items-center">
              <span className="mr-2">♥</span> 4-Player Partnership Pinochle
            </h3>
            <ul className="list-none text-gray-900 space-y-2 ml-4 text-lg font-medium">
              <li className="flex items-start"><span className="text-red-600 mr-2">•</span><span>Players sit across from their partner (Team 1 vs Team 2)</span></li>
              <li className="flex items-start"><span className="text-red-600 mr-2">•</span><span>Each player receives 12 cards</span></li>
              <li className="flex items-start"><span className="text-red-600 mr-2">•</span><span>Uses 2 decks (80 cards)</span></li>
              <li className="flex items-start"><span className="text-red-600 mr-2">•</span><span>Teams work together to reach 500 points (default)</span></li>
            </ul>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-600">
            <h3 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
              <span className="mr-2">♠</span> 6-Player Team Pinochle
            </h3>
            <ul className="list-none text-gray-900 space-y-2 ml-4 text-lg font-medium">
              <li className="flex items-start"><span className="text-blue-600 mr-2">•</span><span>Three teams of two players each</span></li>
              <li className="flex items-start"><span className="text-blue-600 mr-2">•</span><span>Each player receives 8 cards</span></li>
              <li className="flex items-start"><span className="text-blue-600 mr-2">•</span><span>Uses 3 decks (120 cards)</span></li>
              <li className="flex items-start"><span className="text-blue-600 mr-2">•</span><span>More complex bidding and strategy</span></li>
              <li className="flex items-start"><span className="text-blue-600 mr-2">•</span><span>Higher scoring potential</span></li>
            </ul>
          </div>
        </div>

        {/* Game Flow */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-6 border-4 border-blue-700">
          <h2 className="text-3xl font-bold text-blue-900 mb-6 border-b-4 border-red-600 pb-2">♦ Game Flow</h2>

          <div className="space-y-6">
            {/* Step 1 - Dealing */}
            <div className="bg-green-50 p-6 rounded-lg border-l-8 border-green-700">
              <h3 className="text-2xl font-bold text-green-900 mb-3 flex items-center">
                <span className="bg-green-700 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-lg">1</span>
                Dealing
              </h3>
              <p className="text-gray-900 font-medium text-lg mb-3">
                The dealer rotates clockwise each round. Cards are dealt <span className="font-bold text-green-700">4 at a time</span> to each player, starting to the left of the dealer (clockwise direction).
              </p>
              <ul className="list-none text-gray-900 space-y-2 ml-4 text-lg font-medium">
                <li className="flex items-start"><span className="text-green-700 mr-2">♣</span><span>4-player: Each player gets 12 cards</span></li>
                <li className="flex items-start"><span className="text-green-700 mr-2">♣</span><span>6-player: Each player gets 8 cards</span></li>
                <li className="flex items-start"><span className="text-green-700 mr-2">♣</span><span>Dealing proceeds clockwise, 4 cards at a time</span></li>
              </ul>
            </div>

            {/* Step 2 - Bidding */}
            <div className="bg-red-50 p-6 rounded-lg border-l-8 border-red-700">
              <h3 className="text-2xl font-bold text-red-900 mb-3 flex items-center">
                <span className="bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-lg">2</span>
                Bidding
              </h3>
              <p className="text-gray-900 font-medium text-lg mb-3">
                Players bid on the TOTAL points they believe their team can score this round (meld + tricks combined).
              </p>
              <ul className="list-none text-gray-900 space-y-2 ml-4 text-lg font-medium">
                <li className="flex items-start"><span className="text-red-600 mr-2">♥</span><span><span className="font-bold">Minimum bid: 50</span></span></li>
                <li className="flex items-start"><span className="text-red-600 mr-2">♥</span><span>Bidding proceeds clockwise from the left of dealer</span></li>
                <li className="flex items-start"><span className="text-red-600 mr-2">♥</span><span>Below 60: Can increase by any amount</span></li>
                <li className="flex items-start"><span className="text-red-600 mr-2">♥</span><span>At 60 or above: Must increase by 5</span></li>
                <li className="flex items-start"><span className="text-red-600 mr-2">♥</span><span>No maximum bid</span></li>
                <li className="flex items-start"><span className="text-red-600 mr-2">♥</span><span>Once you pass, you cannot re-enter the bidding</span></li>
                <li className="flex items-start"><span className="text-red-600 mr-2">♥</span><span className="font-bold text-red-700">CRITICAL: You must have at least one marriage (K+Q) to bid</span></li>
                <li className="flex items-start"><span className="text-red-600 mr-2">♥</span><span>The highest bidder wins and names trump</span></li>
              </ul>
              <div className="mt-4 p-4 bg-purple-50 rounded-lg border-4 border-purple-500">
                <p className="font-bold text-purple-900 mb-2 text-lg">Meld Bidding (First Round)</p>
                <p className="text-gray-900 font-medium">
                  Traditionally, the first bid around the table signals meld strength: add +1 to the bid for every 10 points of meld. Example: 20 meld = bid 52 (50 + 2). This ends when the bid reaches 60 or after the first round.
                </p>
              </div>
            </div>

            {/* Step 3 - Declaring Trump */}
            <div className="bg-blue-50 p-6 rounded-lg border-l-8 border-blue-700">
              <h3 className="text-2xl font-bold text-blue-900 mb-3 flex items-center">
                <span className="bg-blue-700 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-lg">3</span>
                Declaring Trump
              </h3>
              <p className="text-gray-900 font-medium text-lg mb-3">
                The winning bidder declares the trump suit.
              </p>
              <div className="p-4 bg-red-100 rounded-lg border-4 border-red-600">
                <p className="font-bold text-red-900 mb-2 text-lg">Trump Requirement:</p>
                <p className="text-gray-900 font-medium text-lg">
                  Trump can ONLY be declared in a suit where the bidder has a marriage (K+Q). If trump cannot be called, the team automatically goes set (negative bid amount).
                </p>
              </div>
            </div>

            {/* Step 4 - Melding */}
            <div className="bg-yellow-50 p-6 rounded-lg border-l-8 border-yellow-600">
              <h3 className="text-2xl font-bold text-yellow-900 mb-3 flex items-center">
                <span className="bg-yellow-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-lg">4</span>
                Melding
              </h3>
              <p className="text-gray-900 font-medium text-lg">
                After trump is declared, all players lay down their melds (special card combinations) to score points. See the Meld Scoring section below for values.
              </p>
            </div>

            {/* Step 5 - Trick-Taking */}
            <div className="bg-purple-50 p-6 rounded-lg border-l-8 border-purple-700">
              <h3 className="text-2xl font-bold text-purple-900 mb-3 flex items-center">
                <span className="bg-purple-700 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-lg">5</span>
                Trick-Taking
              </h3>
              <p className="text-gray-900 font-medium text-lg mb-3">
                Players play cards one at a time, trying to win tricks. The bidder leads first.
              </p>
              <ul className="list-none text-gray-900 space-y-2 ml-4 text-lg font-medium">
                <li className="flex items-start"><span className="text-purple-700 mr-2">•</span><span>Must follow suit if possible</span></li>
                <li className="flex items-start"><span className="text-purple-700 mr-2">•</span><span className="font-bold">Must beat the current highest card if you can</span> (even if it beats your partner!)</span></li>
                <li className="flex items-start"><span className="text-purple-700 mr-2">•</span><span>If cannot follow suit, must play trump if possible</span></li>
                <li className="flex items-start"><span className="text-purple-700 mr-2">•</span><span>Must beat with trump if you have higher trump</span></li>
                <li className="flex items-start"><span className="text-purple-700 mr-2">•</span><span>Highest card of the led suit (or highest trump) wins the trick</span></li>
                <li className="flex items-start"><span className="text-purple-700 mr-2">•</span><span className="font-bold">Tie-breaker:</span> If same card is played twice, the first one played wins</span></li>
              </ul>
              <div className="mt-4 p-4 bg-yellow-100 rounded-lg border-4 border-yellow-600">
                <p className="font-bold text-yellow-900 mb-2 text-lg">Illegal Play Penalty:</p>
                <p className="text-gray-900 font-medium">
                  If a player plays incorrectly (doesn&apos;t follow suit, doesn&apos;t beat when able), their team loses 100 points.
                </p>
              </div>
            </div>

            {/* Step 6 - Scoring */}
            <div className="bg-green-50 p-6 rounded-lg border-l-8 border-green-700">
              <h3 className="text-2xl font-bold text-green-900 mb-3 flex items-center">
                <span className="bg-green-700 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-lg">6</span>
                Scoring
              </h3>
              <p className="text-gray-900 font-medium text-lg mb-3">
                Teams count their <span className="font-bold">meld points + trick points</span>.
              </p>
              <ul className="list-none text-gray-900 space-y-2 ml-4 text-lg font-medium">
                <li className="flex items-start"><span className="text-green-700 mr-2">♣</span><span>If bidding team&apos;s total ≥ bid: They score their points, opponents score their points</span></li>
                <li className="flex items-start"><span className="text-red-600 mr-2">♥</span><span className="font-bold text-red-700">If bidding team&apos;s total &lt; bid: They go &quot;set&quot; (NEGATIVE bid amount)</span></li>
                <li className="flex items-start"><span className="text-green-700 mr-2">♣</span><span>Opponents always score their points regardless</span></li>
                <li className="flex items-start"><span className="text-green-700 mr-2">♣</span><span>No penalty for exceeding the bid</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Meld Scoring */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-6 border-4 border-red-700">
          <h2 className="text-3xl font-bold text-red-900 mb-6 border-b-4 border-blue-600 pb-2">♥ Meld Scoring</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-4 border-gray-300">
              <thead className="bg-gradient-to-r from-red-600 to-blue-600 text-white">
                <tr>
                  <th className="px-4 py-3 font-bold text-lg border-r-2 border-white">Meld Type</th>
                  <th className="px-4 py-3 font-bold text-lg border-r-2 border-white">Cards Required</th>
                  <th className="px-4 py-3 font-bold text-lg">Points</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-gray-300 font-medium text-gray-900">
                <tr className="bg-red-50">
                  <td className="px-4 py-3 font-bold border-r-2 border-gray-300">Run</td>
                  <td className="px-4 py-3 border-r-2 border-gray-300">A-10-K-Q-J in trump suit</td>
                  <td className="px-4 py-3 font-bold">15</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="px-4 py-3 font-bold border-r-2 border-gray-300">Double Run</td>
                  <td className="px-4 py-3 border-r-2 border-gray-300">Two runs in trump</td>
                  <td className="px-4 py-3 font-bold">150</td>
                </tr>
                <tr className="bg-red-50">
                  <td className="px-4 py-3 font-bold border-r-2 border-gray-300">Aces Around</td>
                  <td className="px-4 py-3 border-r-2 border-gray-300">One Ace of each suit</td>
                  <td className="px-4 py-3 font-bold">10</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="px-4 py-3 font-bold border-r-2 border-gray-300">Double Aces</td>
                  <td className="px-4 py-3 border-r-2 border-gray-300">Two Aces of each suit</td>
                  <td className="px-4 py-3 font-bold">100</td>
                </tr>
                <tr className="bg-red-50">
                  <td className="px-4 py-3 font-bold border-r-2 border-gray-300">Kings Around</td>
                  <td className="px-4 py-3 border-r-2 border-gray-300">One King of each suit</td>
                  <td className="px-4 py-3 font-bold">8</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="px-4 py-3 font-bold border-r-2 border-gray-300">Double Kings</td>
                  <td className="px-4 py-3 border-r-2 border-gray-300">Two Kings of each suit</td>
                  <td className="px-4 py-3 font-bold">80</td>
                </tr>
                <tr className="bg-red-50">
                  <td className="px-4 py-3 font-bold border-r-2 border-gray-300">Queens Around</td>
                  <td className="px-4 py-3 border-r-2 border-gray-300">One Queen of each suit</td>
                  <td className="px-4 py-3 font-bold">6</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="px-4 py-3 font-bold border-r-2 border-gray-300">Double Queens</td>
                  <td className="px-4 py-3 border-r-2 border-gray-300">Two Queens of each suit</td>
                  <td className="px-4 py-3 font-bold">60</td>
                </tr>
                <tr className="bg-red-50">
                  <td className="px-4 py-3 font-bold border-r-2 border-gray-300">Jacks Around</td>
                  <td className="px-4 py-3 border-r-2 border-gray-300">One Jack of each suit</td>
                  <td className="px-4 py-3 font-bold">4</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="px-4 py-3 font-bold border-r-2 border-gray-300">Double Jacks</td>
                  <td className="px-4 py-3 border-r-2 border-gray-300">Two Jacks of each suit</td>
                  <td className="px-4 py-3 font-bold">40</td>
                </tr>
                <tr className="bg-red-50">
                  <td className="px-4 py-3 font-bold border-r-2 border-gray-300">Pinochle</td>
                  <td className="px-4 py-3 border-r-2 border-gray-300">Queen of Spades + Jack of Diamonds</td>
                  <td className="px-4 py-3 font-bold">4</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="px-4 py-3 font-bold border-r-2 border-gray-300">Double Pinochle</td>
                  <td className="px-4 py-3 border-r-2 border-gray-300">Two Q♠ + Two J♦</td>
                  <td className="px-4 py-3 font-bold">30</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="px-4 py-3 font-bold border-r-2 border-gray-300">Triple Pinochle</td>
                  <td className="px-4 py-3 border-r-2 border-gray-300">Three Q♠ + Three J♦</td>
                  <td className="px-4 py-3 font-bold text-green-700 text-xl">90</td>
                </tr>
                <tr className="bg-red-50">
                  <td className="px-4 py-3 font-bold border-r-2 border-gray-300">Royal Marriage</td>
                  <td className="px-4 py-3 border-r-2 border-gray-300">K-Q in trump suit</td>
                  <td className="px-4 py-3 font-bold">4</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="px-4 py-3 font-bold border-r-2 border-gray-300">Common Marriage</td>
                  <td className="px-4 py-3 border-r-2 border-gray-300">K-Q in non-trump suit</td>
                  <td className="px-4 py-3 font-bold">2</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border-4 border-blue-600">
            <p className="text-gray-900 font-medium text-lg">
              <span className="font-bold">Note:</span> There is no bonus for double marriages. Each marriage counts separately at its standard value (2 or 4). The same card can be used in multiple melds.
            </p>
          </div>
        </div>

        {/* Trick Points */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-6 border-4 border-green-700">
          <h2 className="text-3xl font-bold text-green-900 mb-6 border-b-4 border-red-600 pb-2">♣ Trick Points</h2>

          <p className="text-gray-900 font-medium text-lg mb-4">
            Points are awarded for capturing certain cards in tricks:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-4 border-gray-300">
              <thead className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
                <tr>
                  <th className="px-4 py-3 font-bold text-lg border-r-2 border-white">Card</th>
                  <th className="px-4 py-3 font-bold text-lg">Points</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-gray-300 font-medium text-gray-900">
                <tr className="bg-red-50">
                  <td className="px-4 py-3 border-r-2 border-gray-300">Ace</td>
                  <td className="px-4 py-3">1 point each</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="px-4 py-3 border-r-2 border-gray-300">Ten</td>
                  <td className="px-4 py-3">1 point each</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="px-4 py-3 border-r-2 border-gray-300">King</td>
                  <td className="px-4 py-3">1 point each</td>
                </tr>
                <tr className="bg-yellow-50">
                  <td className="px-4 py-3 border-r-2 border-gray-300">Last Trick (4-player)</td>
                  <td className="px-4 py-3 font-bold text-blue-700">2 points</td>
                </tr>
                <tr className="bg-purple-50">
                  <td className="px-4 py-3 border-r-2 border-gray-300">Last Trick (6-player)</td>
                  <td className="px-4 py-3 font-bold text-red-700">3 points</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border-4 border-blue-600">
            <p className="text-gray-900 font-bold text-lg mb-2">
              Total Trick Points Available:
            </p>
            <ul className="text-gray-900 font-medium space-y-1 text-lg">
              <li className="flex items-start"><span className="text-red-600 mr-2">♦</span><span>4-player: 26 points (8 Aces + 8 Tens + 8 Kings + 2 last trick)</span></li>
              <li className="flex items-start"><span className="text-blue-600 mr-2">♠</span><span>6-player: 39 points (12 Aces + 12 Tens + 12 Kings + 3 last trick)</span></li>
            </ul>
          </div>
        </div>

        {/* Winning the Game */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-6 border-4 border-blue-700">
          <h2 className="text-3xl font-bold text-blue-900 mb-6 border-b-4 border-red-600 pb-2">🏆 Winning the Game</h2>
          <p className="text-gray-900 font-medium text-lg mb-4 leading-relaxed">
            The game is typically played to 500 points (default). The first team to reach or exceed the target score wins. If the bidding team makes their bid and reaches the target, they win immediately. If they go set and the opponents reach the target, the opponents win.
          </p>
          <div className="p-4 bg-yellow-50 rounded-lg border-4 border-yellow-600">
            <p className="text-gray-900 font-medium text-lg">
              <span className="font-bold">Important:</span> If both teams reach the target score in the same round, the bidding team wins if they made their bid.
            </p>
          </div>
        </div>

        {/* Strategy Tips */}
        <div className="bg-white rounded-lg shadow-xl p-8 border-4 border-red-700">
          <h2 className="text-3xl font-bold text-red-900 mb-6 border-b-4 border-blue-600 pb-2">💡 Strategy Tips</h2>
          <ul className="list-none text-gray-900 space-y-3 text-lg font-medium">
            <li className="flex items-start"><span className="text-red-600 mr-2">♥</span><span>Count your meld points before bidding to estimate your total potential</span></li>
            <li className="flex items-start"><span className="text-blue-600 mr-2">♠</span><span>Must have at least one marriage (K+Q) to bid - check this first!</span></li>
            <li className="flex items-start"><span className="text-red-600 mr-2">♦</span><span>Can only call trump in suits where you have K+Q</span></li>
            <li className="flex items-start"><span className="text-blue-600 mr-2">♠</span><span>Remember that 10s are the second highest cards - they beat Kings!</span></li>
            <li className="flex items-start"><span className="text-green-700 mr-2">♣</span><span>Remember your partner can help - their meld contributes too</span></li>
            <li className="flex items-start"><span className="text-red-600 mr-2">♥</span><span>Trump cards are powerful - use them strategically</span></li>
            <li className="flex items-start"><span className="text-blue-600 mr-2">♠</span><span>You must beat if you can - no choice even if it beats your partner</span></li>
            <li className="flex items-start"><span className="text-red-600 mr-2">♦</span><span>Keep track of which cards have been played</span></li>
            <li className="flex items-start"><span className="text-green-700 mr-2">♣</span><span>Don&apos;t be afraid to pass if your hand is weak or you lack marriages</span></li>
            <li className="flex items-start"><span className="text-blue-600 mr-2">♠</span><span>The last trick bonus is significant (2-3 points)</span></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
