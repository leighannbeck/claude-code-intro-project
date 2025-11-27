import { Meld, Player } from "@/types/game"
import { getMeldDescription } from "@/game"
import Card from "./Card"

interface MeldDisplayProps {
  players: Player[]
  currentUserId: string
}

export default function MeldDisplay({ players, currentUserId }: MeldDisplayProps) {
  const currentPlayer = players.find(p => p.id === currentUserId)

  if (!currentPlayer) return null

  const totalMeldPoints = currentPlayer.melds.reduce((sum, meld) => sum + meld.points, 0)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Your Melds</h2>
        <div className="text-2xl font-bold text-blue-600">
          {totalMeldPoints} pts
        </div>
      </div>

      {currentPlayer.melds.length === 0 ? (
        <div className="text-gray-500 text-center py-8">
          No melds found
        </div>
      ) : (
        <div className="space-y-4">
          {currentPlayer.melds.map((meld, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-3 bg-gray-50"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">
                  {getMeldDescription(meld)}
                </h3>
                <span className="text-lg font-bold text-blue-600">
                  {meld.points} pts
                </span>
              </div>
              <div className="flex gap-1 flex-wrap">
                {meld.cards.map((card) => (
                  <Card key={card.id} card={card} size="small" />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Team melds summary */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-2">Team Melds:</h3>
        <div className="grid grid-cols-2 gap-3">
          {[1, 2].map((team) => {
            const teamPlayers = players.filter(p => p.team === team)
            const teamMeldPoints = teamPlayers.reduce(
              (sum, p) => sum + p.melds.reduce((s, m) => s + m.points, 0),
              0
            )

            return (
              <div
                key={team}
                className={`p-3 rounded-lg ${
                  team === 1 ? "bg-blue-50 border border-blue-200" : "bg-red-50 border border-red-200"
                }`}
              >
                <div className="text-sm font-semibold mb-1">Team {team}</div>
                <div className="text-xl font-bold">
                  {teamMeldPoints} pts
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {teamPlayers.map(p => p.name).join(", ")}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
