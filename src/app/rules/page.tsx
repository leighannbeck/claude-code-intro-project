export default function RulesPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Pinochle Rules</h1>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
          <p className="text-gray-700 mb-4">
            Pinochle is a trick-taking card game played with a special 48-card deck consisting of two copies each of the 9, 10, Jack, Queen, King, and Ace in all four suits. The game combines bidding, melding, and trick-taking elements, requiring both strategy and teamwork.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">The Deck</h2>
          <p className="text-gray-700 mb-4">
            The Pinochle deck contains 48 cards:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>Two of each: 9, 10, Jack, Queen, King, Ace</li>
            <li>In all four suits: Spades, Hearts, Diamonds, Clubs</li>
            <li>Each card appears exactly twice in the deck</li>
          </ul>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-gray-700 font-semibold">Card Ranking (High to Low):</p>
            <p className="text-gray-700">Ace, 10, King, Queen, Jack, 9</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Game Variants</h2>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">4-Player Partnership Pinochle</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Players sit across from their partner (North-South vs East-West)</li>
              <li>Each player receives 12 cards</li>
              <li>Teams work together to reach a winning score (typically 500 or 1000 points)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">6-Player Team Pinochle</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Two teams of three players each</li>
              <li>Each player receives 8 cards</li>
              <li>More complex bidding and strategy</li>
              <li>Higher scoring potential</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Game Flow</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Dealing</h3>
              <p className="text-gray-700">
                Cards are dealt clockwise, with each player receiving their full hand. In 4-player, each gets 12 cards. In 6-player, each gets 8 cards.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">2. Bidding</h3>
              <p className="text-gray-700 mb-2">
                Players bid on the minimum number of points they believe their team can score. Bidding starts at a minimum (usually 20 or 25) and increases in increments of 1.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Bidding proceeds clockwise</li>
                <li>Players can bid higher or pass</li>
                <li>Once you pass, you cannot re-enter the bidding</li>
                <li>The highest bidder wins and names trump</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Melding</h3>
              <p className="text-gray-700 mb-2">
                After trump is declared, all players lay down their melds (special card combinations) to score points. See the Meld Scoring section below for values.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">4. Trick-Taking</h3>
              <p className="text-gray-700 mb-2">
                Players play cards one at a time, trying to win tricks. The bidder leads first.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Must follow suit if possible</li>
                <li>Must play higher if possible when following suit</li>
                <li>If cannot follow suit, must play trump if possible</li>
                <li>Highest card of the led suit (or highest trump) wins the trick</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">5. Scoring</h3>
              <p className="text-gray-700">
                Teams count their meld points and trick points. If the bidding team meets or exceeds their bid, they score their points. If they fail, they lose the bid amount (go "set").
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Meld Scoring</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 font-semibold">Meld Type</th>
                  <th className="px-4 py-3 font-semibold">Cards Required</th>
                  <th className="px-4 py-3 font-semibold">Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-medium">Run</td>
                  <td className="px-4 py-3">A-10-K-Q-J in trump suit</td>
                  <td className="px-4 py-3">15</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-medium">Double Run</td>
                  <td className="px-4 py-3">Two runs in trump</td>
                  <td className="px-4 py-3">150</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Aces Around</td>
                  <td className="px-4 py-3">One Ace of each suit</td>
                  <td className="px-4 py-3">10</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-medium">Double Aces</td>
                  <td className="px-4 py-3">Two Aces of each suit</td>
                  <td className="px-4 py-3">100</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Kings Around</td>
                  <td className="px-4 py-3">One King of each suit</td>
                  <td className="px-4 py-3">8</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-medium">Double Kings</td>
                  <td className="px-4 py-3">Two Kings of each suit</td>
                  <td className="px-4 py-3">80</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Queens Around</td>
                  <td className="px-4 py-3">One Queen of each suit</td>
                  <td className="px-4 py-3">6</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-medium">Double Queens</td>
                  <td className="px-4 py-3">Two Queens of each suit</td>
                  <td className="px-4 py-3">60</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Jacks Around</td>
                  <td className="px-4 py-3">One Jack of each suit</td>
                  <td className="px-4 py-3">4</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-medium">Double Jacks</td>
                  <td className="px-4 py-3">Two Jacks of each suit</td>
                  <td className="px-4 py-3">40</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Pinochle</td>
                  <td className="px-4 py-3">Queen of Spades + Jack of Diamonds</td>
                  <td className="px-4 py-3">4</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-medium">Double Pinochle</td>
                  <td className="px-4 py-3">Both Q♠ and both J♦</td>
                  <td className="px-4 py-3">30</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Royal Marriage</td>
                  <td className="px-4 py-3">K-Q in trump suit</td>
                  <td className="px-4 py-3">4</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-medium">Common Marriage</td>
                  <td className="px-4 py-3">K-Q in non-trump suit</td>
                  <td className="px-4 py-3">2</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Dix</td>
                  <td className="px-4 py-3">9 of trump suit</td>
                  <td className="px-4 py-3">1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Trick Points</h2>

          <p className="text-gray-700 mb-4">
            Points are awarded for capturing certain cards in tricks:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 font-semibold">Card</th>
                  <th className="px-4 py-3 font-semibold">Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3">Ace</td>
                  <td className="px-4 py-3">1 point each</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3">Ten</td>
                  <td className="px-4 py-3">1 point each</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">King</td>
                  <td className="px-4 py-3">1 point each</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3">Last Trick</td>
                  <td className="px-4 py-3">1 point</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-gray-700">
              <span className="font-semibold">Total Trick Points Available:</span> 25 points (24 from cards + 1 for last trick)
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Winning the Game</h2>
          <p className="text-gray-700 mb-4">
            The game is typically played to 500 or 1000 points. The first team to reach or exceed the target score wins. If the bidding team makes their bid and reaches the target, they win immediately. If they go set and the opponents reach the target, the opponents win.
          </p>
          <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
            <p className="text-gray-700">
              <span className="font-semibold">Important:</span> If both teams reach the target score in the same round, the bidding team wins if they made their bid.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Strategy Tips</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>Count your meld points before bidding to estimate your total potential</li>
            <li>Remember that your partner can help you make your bid</li>
            <li>Trump cards are powerful - use them strategically</li>
            <li>Keep track of which cards have been played</li>
            <li>Communicate with your partner through legal plays</li>
            <li>Don't be afraid to pass if your hand is weak</li>
            <li>The 10s are valuable - protect them when possible</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
