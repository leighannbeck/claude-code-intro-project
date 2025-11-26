import { Player, Trick, TeamScore } from "@/types/game"
import { calculateMeldPoints } from "./melds"
import { calculateTeamTrickPoints } from "./tricks"

/**
 * Total trick points available in a round
 * 8 Aces (8 points) + 8 Tens (8 points) + 8 Kings (8 points) + Last trick (1 point) = 25 points
 */
export const TOTAL_TRICK_POINTS = 25

/**
 * Bonus point for winning the last trick
 */
export const LAST_TRICK_BONUS = 1

/**
 * Calculates the meld score for a team
 */
export function calculateTeamMeldScore(players: Player[], team: 1 | 2): number {
  const teamPlayers = players.filter(p => p.team === team)
  return teamPlayers.reduce((total, player) => {
    return total + calculateMeldPoints(player.melds)
  }, 0)
}

/**
 * Calculates trick points for a team
 * Includes the last trick bonus if they won it
 */
export function calculateTeamScore(
  players: Player[],
  tricks: Trick[],
  team: 1 | 2,
  wonLastTrick: boolean
): {
  meldPoints: number
  trickPoints: number
  total: number
} {
  const teamPlayerIds = players.filter(p => p.team === team).map(p => p.id)

  // Calculate meld points
  const meldPoints = calculateTeamMeldScore(players, team)

  // Calculate trick points
  let trickPoints = calculateTeamTrickPoints(tricks, teamPlayerIds)

  // Add last trick bonus if they won it
  if (wonLastTrick) {
    trickPoints += LAST_TRICK_BONUS
  }

  return {
    meldPoints,
    trickPoints,
    total: meldPoints + trickPoints
  }
}

/**
 * Determines if the bidding team made their bid
 */
export function didTeamMakeBid(
  teamScore: number,
  bidAmount: number
): boolean {
  return teamScore >= bidAmount
}

/**
 * Calculates the round result and updates scores
 * Returns the new score state
 */
export function calculateRoundResult(
  players: Player[],
  tricks: Trick[],
  biddingTeam: 1 | 2,
  bidAmount: number,
  currentScores: TeamScore,
  targetScore: number
): {
  team1Score: number
  team2Score: number
  biddingTeamMadeBid: boolean
  winner: 1 | 2 | null
  gameOver: boolean
} {
  // Determine who won the last trick
  const lastTrick = tricks[tricks.length - 1]
  const lastTrickWinner = lastTrick?.winner
  const wonLastTrick = (team: 1 | 2) => {
    if (!lastTrickWinner) return false
    const winnerPlayer = players.find(p => p.id === lastTrickWinner)
    return winnerPlayer?.team === team
  }

  // Calculate scores for both teams
  const team1Result = calculateTeamScore(players, tricks, 1, wonLastTrick(1))
  const team2Result = calculateTeamScore(players, tricks, 2, wonLastTrick(2))

  let team1Score = currentScores.team1.total
  let team2Score = currentScores.team2.total

  // Check if bidding team made their bid
  const biddingTeamScore = biddingTeam === 1 ? team1Result.total : team2Result.total
  const biddingTeamMadeBid = didTeamMakeBid(biddingTeamScore, bidAmount)

  if (biddingTeamMadeBid) {
    // Bidding team made their bid - they score their points
    if (biddingTeam === 1) {
      team1Score += team1Result.total
    } else {
      team2Score += team2Result.total
    }

    // Non-bidding team always scores their points
    if (biddingTeam === 1) {
      team2Score += team2Result.total
    } else {
      team1Score += team1Result.total
    }
  } else {
    // Bidding team went "set" - they lose the bid amount
    if (biddingTeam === 1) {
      team1Score -= bidAmount
    } else {
      team2Score -= bidAmount
    }

    // Non-bidding team still scores their points
    if (biddingTeam === 1) {
      team2Score += team2Result.total
    } else {
      team1Score += team1Result.total
    }
  }

  // Check for winner
  const gameOver = team1Score >= targetScore || team2Score >= targetScore
  let winner: 1 | 2 | null = null

  if (gameOver) {
    if (team1Score >= targetScore && team2Score >= targetScore) {
      // Both teams reached target - bidding team wins if they made their bid
      if (biddingTeamMadeBid) {
        winner = biddingTeam
      } else {
        winner = biddingTeam === 1 ? 2 : 1
      }
    } else if (team1Score >= targetScore) {
      winner = 1
    } else {
      winner = 2
    }
  }

  return {
    team1Score,
    team2Score,
    biddingTeamMadeBid,
    winner,
    gameOver
  }
}

/**
 * Formats a score for display
 */
export function formatScore(score: number): string {
  return score.toString()
}

/**
 * Gets a description of the round result
 */
export function getRoundResultMessage(
  biddingTeam: 1 | 2,
  bidAmount: number,
  teamScore: number,
  madeBid: boolean
): string {
  if (madeBid) {
    return `Team ${biddingTeam} made their bid of ${bidAmount}! They scored ${teamScore} points.`
  } else {
    return `Team ${biddingTeam} went set! They bid ${bidAmount} but only scored ${teamScore} points.`
  }
}
