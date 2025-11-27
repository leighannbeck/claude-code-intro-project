import { Trick, Suit } from "@/types/game"
import Card from "./Card"

interface TrickAreaProps {
  currentTrick: Trick
  trumpSuit: Suit | null
  playerNames: string[]
  completedTricks: number
}

export default function TrickArea({
  currentTrick,
  trumpSuit,
  playerNames,
  completedTricks,
}: TrickAreaProps) {
  return (
    <div className="bg-gradient-to-br from-green-700 to-green-900 rounded-lg shadow-lg p-8 min-h-[400px] flex flex-col items-center justify-center relative">
      {/* Trump indicator */}
      {trumpSuit && (
        <div className="absolute top-4 right-4 bg-white rounded-lg px-4 py-2 shadow-md">
          <div className="text-xs text-gray-600 mb-1">Trump:</div>
          <div className="text-2xl font-bold capitalize">{trumpSuit}</div>
        </div>
      )}

      {/* Tricks won counter */}
      <div className="absolute top-4 left-4 bg-white rounded-lg px-4 py-2 shadow-md">
        <div className="text-xs text-gray-600 mb-1">Tricks Won:</div>
        <div className="text-2xl font-bold">{completedTricks}</div>
      </div>

      {/* Current trick display */}
      {currentTrick.cards.length === 0 ? (
        <div className="text-white text-center">
          <div className="text-4xl mb-2">🎴</div>
          <div className="text-lg font-semibold">Waiting for first card...</div>
        </div>
      ) : (
        <div>
          {/* Lead suit indicator */}
          {currentTrick.leadSuit && (
            <div className="text-center mb-4">
              <div className="text-white text-sm mb-2">Lead Suit:</div>
              <div className="bg-white rounded-lg px-4 py-2 inline-block">
                <span className="text-xl font-bold capitalize">
                  {currentTrick.leadSuit}
                </span>
              </div>
            </div>
          )}

          {/* Cards played in trick */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {currentTrick.cards.map(({ playerId, card }, index) => {
              const playerIndex = parseInt(playerId.split("-")[1])
              const playerName = playerNames[playerIndex] || `Player ${playerIndex + 1}`

              return (
                <div key={index} className="flex flex-col items-center gap-2">
                  <Card card={card} size="medium" />
                  <div className="bg-white rounded px-3 py-1 text-sm font-medium">
                    {playerName}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
