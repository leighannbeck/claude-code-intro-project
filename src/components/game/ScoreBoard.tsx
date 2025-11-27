import { TeamScore } from "@/types/game"

interface ScoreBoardProps {
  scores: TeamScore
  targetScore: number
  winningBid: number | null
  biddingTeam: 1 | 2 | 3 | null
  currentRound: number
}

export default function ScoreBoard({
  scores,
  targetScore,
  winningBid,
  biddingTeam,
  currentRound,
}: ScoreBoardProps) {
  const hasTeam3 = scores.team3 !== undefined

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Score Board</h2>

      {/* Round and target info */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Round:</span>
          <span className="font-bold">{currentRound}</span>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span className="text-gray-600">Target Score:</span>
          <span className="font-bold">{targetScore}</span>
        </div>
        {winningBid !== null && biddingTeam !== null && (
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-600">Current Bid:</span>
            <span className="font-bold text-blue-600">
              Team {biddingTeam} - {winningBid}
            </span>
          </div>
        )}
      </div>

      {/* Team scores */}
      <div className="space-y-3">
        {/* Team 1 */}
        <div
          className={`p-4 rounded-lg border-2 ${
            biddingTeam === 1
              ? "border-yellow-400 bg-yellow-50"
              : "border-blue-300 bg-blue-50"
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-lg text-blue-900">Team 1</h3>
            <div className="text-2xl font-bold text-blue-900">
              {scores.team1.total}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Meld:</span>
              <span className="font-semibold">{scores.team1.meld}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tricks:</span>
              <span className="font-semibold">{scores.team1.tricks}</span>
            </div>
          </div>
        </div>

        {/* Team 2 */}
        <div
          className={`p-4 rounded-lg border-2 ${
            biddingTeam === 2
              ? "border-yellow-400 bg-yellow-50"
              : "border-red-300 bg-red-50"
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-lg text-red-900">Team 2</h3>
            <div className="text-2xl font-bold text-red-900">
              {scores.team2.total}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Meld:</span>
              <span className="font-semibold">{scores.team2.meld}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tricks:</span>
              <span className="font-semibold">{scores.team2.tricks}</span>
            </div>
          </div>
        </div>

        {/* Team 3 (6-player only) */}
        {hasTeam3 && scores.team3 && (
          <div
            className={`p-4 rounded-lg border-2 ${
              biddingTeam === 3
                ? "border-yellow-400 bg-yellow-50"
                : "border-green-300 bg-green-50"
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg text-green-900">Team 3</h3>
              <div className="text-2xl font-bold text-green-900">
                {scores.team3.total}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Meld:</span>
                <span className="font-semibold">{scores.team3.meld}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tricks:</span>
                <span className="font-semibold">{scores.team3.tricks}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Progress bars */}
      <div className="mt-4 space-y-2">
        <div>
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Team 1 Progress</span>
            <span>{Math.round((scores.team1.total / targetScore) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${Math.min((scores.team1.total / targetScore) * 100, 100)}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Team 2 Progress</span>
            <span>{Math.round((scores.team2.total / targetScore) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-red-600 h-2 rounded-full transition-all"
              style={{ width: `${Math.min((scores.team2.total / targetScore) * 100, 100)}%` }}
            />
          </div>
        </div>

        {hasTeam3 && scores.team3 && (
          <div>
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Team 3 Progress</span>
              <span>{Math.round((scores.team3.total / targetScore) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all"
                style={{ width: `${Math.min((scores.team3.total / targetScore) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
