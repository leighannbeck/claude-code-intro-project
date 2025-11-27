import { Suit } from "@/types/game"

interface TrumpSelectorProps {
  onSelectTrump: (suit: Suit) => void
  winningBid: number
  winnerName: string
  availableSuits: Suit[] // Only suits where player has K+Q
}

const suitSymbols: Record<Suit, string> = {
  [Suit.SPADES]: "♠",
  [Suit.HEARTS]: "♥",
  [Suit.DIAMONDS]: "♦",
  [Suit.CLUBS]: "♣",
}

const suitColors: Record<Suit, string> = {
  [Suit.SPADES]: "bg-gray-800 hover:bg-gray-900",
  [Suit.HEARTS]: "bg-red-600 hover:bg-red-700",
  [Suit.DIAMONDS]: "bg-red-600 hover:bg-red-700",
  [Suit.CLUBS]: "bg-gray-800 hover:bg-gray-900",
}

export default function TrumpSelector({
  onSelectTrump,
  winningBid,
  winnerName,
  availableSuits,
}: TrumpSelectorProps) {
  const allSuits = [Suit.SPADES, Suit.HEARTS, Suit.DIAMONDS, Suit.CLUBS]

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Declare Trump</h2>

      <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <p className="text-sm font-semibold text-green-900">
          {winnerName} won the bid with {winningBid}!
        </p>
        <p className="text-sm text-gray-600 mt-1">
          Select trump from suits where you have a marriage (K+Q)
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {allSuits.map((suit) => {
          const isAvailable = availableSuits.includes(suit)
          return (
            <button
              key={suit}
              onClick={() => isAvailable && onSelectTrump(suit)}
              disabled={!isAvailable}
              className={`
                ${isAvailable ? suitColors[suit] : "bg-gray-300 cursor-not-allowed"}
                text-white font-bold py-8 px-4 rounded-lg
                transition-all ${isAvailable ? "transform hover:scale-105" : "opacity-50"}
                flex flex-col items-center justify-center gap-2
              `}
            >
              <span className="text-5xl">{suitSymbols[suit]}</span>
              <span className="text-lg capitalize">{suit}</span>
              {!isAvailable && (
                <span className="text-xs text-gray-600">No marriage</span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
