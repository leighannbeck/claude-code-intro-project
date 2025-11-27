import { Player, Trick, TeamScore } from "@/types/game"
import { calculateMeldPoints } from "./melds"
import { calculateTeamTrickPoints } from "./tricks"

/**
 * Last trick bonus points (additional to cards in the trick)
 * 4-player: 2 points
 * 6-player: 3 points
 */
export function getLastTrickBonus(numPlayers: number): number {
  return numPlayers === 4 ? 2 : 3
}

/**
 * Total trick points available in a round (not including meld)
 * 4-player (2 decks): 8A + 8T + 8K = 24 points + 2 last trick = 26 total
 * 6-player (3 decks): 12A + 12T + 12K = 36 points + 3 last trick = 39 total
 */
export function getTotalTrickPoints(numPlayers: number): number {
  const numDecks = numPlayers === 4 ? 2 : 3
  const pointCardCount = numDecks * 4 * 3 // (decks * suits * cards per suit: A,T,K)
  const lastTrickBonus = getLastTrickBonus(numPlayers)
  return pointCardCount + lastTrickBonus
}

/**
 * Calculates the meld score for a team
 */
export function calculateTeamMeldScore(players: Player[], team: 1 | 2 | 3): number {
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
  team: 1 | 2 | 3,
  wonLastTrick: boolean,
  numPlayers: number
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
    trickPoints += getLastTrickBonus(numPlayers)
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
  biddingTeam: 1 | 2 | 3,
  bidAmount: number,
  currentScores: TeamScore,
  targetScore: number
): {
  team1Score: number
  team2Score: number
  team3Score?: number
  biddingTeamMadeBid: boolean
  winner: 1 | 2 | 3 | null
  gameOver: boolean
} {
  // Determine who won the last trick
  const lastTrick = tricks[tricks.length - 1]
  const lastTrickWinner = lastTrick?.winner
  const wonLastTrick = (team: 1 | 2 | 3) => {
    if (!lastTrickWinner) return false
    const winnerPlayer = players.find(p => p.id === lastTrickWinner)
    return winnerPlayer?.team === team
  }

  // Calculate scores for all teams
  const numPlayers = players.length
  const numTeams = numPlayers === 4 ? 2 : 3

  const team1Result = calculateTeamScore(players, tricks, 1, wonLastTrick(1), numPlayers)
  const team2Result = calculateTeamScore(players, tricks, 2, wonLastTrick(2), numPlayers)
  const team3Result = numTeams === 3 ? calculateTeamScore(players, tricks, 3, wonLastTrick(3), numPlayers) : null

  let team1Score = currentScores.team1.total
  let team2Score = currentScores.team2.total
  let team3Score = currentScores.team3?.total ?? 0

  // Check if bidding team made their bid
  const biddingTeamResult = biddingTeam === 1 ? team1Result : biddingTeam === 2 ? team2Result : team3Result!
  const biddingTeamMadeBid = didTeamMakeBid(biddingTeamResult.total, bidAmount)

  if (biddingTeamMadeBid) {
    // Bidding team made their bid - all teams score their points
    team1Score += team1Result.total
    team2Score += team2Result.total
    if (team3Result) team3Score += team3Result.total
  } else {
    // Bidding team went "set" - they lose the bid amount
    if (biddingTeam === 1) {
      team1Score -= bidAmount
    } else if (biddingTeam === 2) {
      team2Score -= bidAmount
    } else {
      team3Score -= bidAmount
    }

    // Non-bidding teams still score their points
    if (biddingTeam !== 1) team1Score += team1Result.total
    if (biddingTeam !== 2) team2Score += team2Result.total
    if (team3Result && biddingTeam !== 3) team3Score += team3Result.total
  }

  // Check for winner
  const scores = [
    { team: 1 as 1 | 2 | 3, score: team1Score },
    { team: 2 as 1 | 2 | 3, score: team2Score },
    ...(numTeams === 3 ? [{ team: 3 as 1 | 2 | 3, score: team3Score }] : [])
  ]

  const teamsAtTarget = scores.filter(s => s.score >= targetScore)
  const gameOver = teamsAtTarget.length > 0
  let winner: 1 | 2 | 3 | null = null

  if (gameOver) {
    if (teamsAtTarget.length === 1) {
      // Only one team reached target
      winner = teamsAtTarget[0].team
    } else {
      // Multiple teams reached target - bidding team wins if they made their bid
      if (biddingTeamMadeBid && teamsAtTarget.some(t => t.team === biddingTeam)) {
        winner = biddingTeam
      } else {
        // Highest scoring team wins
        winner = teamsAtTarget.reduce((highest, current) =>
          current.score > highest.score ? current : highest
        ).team
      }
    }
  }

  return {
    team1Score,
    team2Score,
    ...(numTeams === 3 && { team3Score }),
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
  biddingTeam: 1 | 2 | 3,
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
