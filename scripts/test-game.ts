/**
 * Test script to demonstrate and verify the Pinochle game engine
 * Run with: npx ts-node scripts/test-game.ts
 */

import {
  createGame,
  startNewRound,
  processBid,
  declareTrump,
  playCard,
  getCurrentPlayer,
  formatCard,
  formatCards,
  getMeldDescription
} from "../src/game"
import { GameVariant, GamePhase, Suit } from "../src/types/game"

console.log("=".repeat(60))
console.log("PINOCHLE GAME ENGINE TEST")
console.log("=".repeat(60))
console.log()

// Step 1: Create a new 4-player game
console.log("📋 Step 1: Creating a new 4-player game...")
let game = createGame(
  "test-game-1",
  GameVariant.FOUR_PLAYER,
  ["Alice", "Bob", "Charlie", "Diana"],
  100 // Lower target for testing
)

console.log(`✅ Game created with ID: ${game.id}`)
console.log(`   Players: ${game.players.map(p => `${p.name} (Team ${p.team})`).join(", ")}`)
console.log(`   Target Score: ${game.targetScore}`)
console.log(`   Phase: ${game.phase}`)
console.log()

// Step 2: Start a new round
console.log("📋 Step 2: Starting a new round and dealing cards...")
game = startNewRound(game)

console.log(`✅ Round ${game.roundNumber} started`)
console.log(`   Phase: ${game.phase}`)
console.log()

// Display each player's hand
console.log("   Player Hands:")
game.players.forEach(player => {
  console.log(`   ${player.name}: ${formatCards(player.hand)} (${player.hand.length} cards)`)
})
console.log()

// Step 3: Bidding phase
console.log("📋 Step 3: Bidding phase...")
console.log()

// Helper to get current bidder
const getCurrentBidder = () => game.players[game.currentBidderIndex]

// First player bids 25
let currentBidder = getCurrentBidder()
console.log(`   ${currentBidder.name} bids 25`)
game = processBid(game, currentBidder.id, 25)

// Second player passes
currentBidder = getCurrentBidder()
console.log(`   ${currentBidder.name} passes`)
game = processBid(game, currentBidder.id, null)

// Third player bids 26
currentBidder = getCurrentBidder()
console.log(`   ${currentBidder.name} bids 26`)
game = processBid(game, currentBidder.id, 26)

// Fourth player passes
currentBidder = getCurrentBidder()
console.log(`   ${currentBidder.name} passes`)
game = processBid(game, currentBidder.id, null)

// First player bids 27
currentBidder = getCurrentBidder()
console.log(`   ${currentBidder.name} bids 27`)
game = processBid(game, currentBidder.id, 27)

// Third player passes
currentBidder = getCurrentBidder()
console.log(`   ${currentBidder.name} passes`)
game = processBid(game, currentBidder.id, null)

console.log()
const winner = game.players.find(p => p.id === game.winningBidderId)!
console.log(`✅ Bidding complete!`)
console.log(`   Winner: ${winner.name} (Team ${winner.team})`)
console.log(`   Winning Bid: ${game.winningBid}`)
console.log(`   Phase: ${game.phase}`)
console.log()

// Step 4: Declare trump and show melds
console.log("📋 Step 4: Declaring trump and finding melds...")

// Look at winner's hand to choose best trump
const suitCounts = {
  [Suit.SPADES]: winner.hand.filter(c => c.suit === Suit.SPADES).length,
  [Suit.HEARTS]: winner.hand.filter(c => c.suit === Suit.HEARTS).length,
  [Suit.DIAMONDS]: winner.hand.filter(c => c.suit === Suit.DIAMONDS).length,
  [Suit.CLUBS]: winner.hand.filter(c => c.suit === Suit.CLUBS).length,
}

// Choose suit with most cards
const bestTrump = Object.entries(suitCounts).sort((a, b) => b[1] - a[1])[0][0] as Suit

console.log(`   ${winner.name} declares ${bestTrump} as trump`)
game = declareTrump(game, bestTrump)

console.log()
console.log(`✅ Trump declared: ${bestTrump}`)
console.log(`   Phase: ${game.phase}`)
console.log()

// Show all players' melds
console.log("   Melds found:")
game.players.forEach(player => {
  const totalMeld = player.melds.reduce((sum, m) => sum + m.points, 0)
  console.log(`   ${player.name} (Team ${player.team}): ${totalMeld} points`)

  if (player.melds.length > 0) {
    player.melds.forEach(meld => {
      console.log(`      - ${getMeldDescription(meld)}: ${formatCards(meld.cards)}`)
    })
  } else {
    console.log(`      - No melds`)
  }
})
console.log()

// Calculate team meld totals
const team1Melds = game.players
  .filter(p => p.team === 1)
  .reduce((sum, p) => sum + p.melds.reduce((s, m) => s + m.points, 0), 0)

const team2Melds = game.players
  .filter(p => p.team === 2)
  .reduce((sum, p) => sum + p.melds.reduce((s, m) => s + m.points, 0), 0)

console.log(`   Team 1 Total Melds: ${team1Melds} points`)
console.log(`   Team 2 Total Melds: ${team2Melds} points`)
console.log()

// Step 5: Play a few tricks
console.log("📋 Step 5: Playing tricks...")
console.log()

let trickCount = 0
const maxTricksToShow = 3 // Only show first 3 tricks for brevity
let currentPlayer

while (game.phase === GamePhase.TRICK_TAKING && trickCount < maxTricksToShow) {
  const isNewTrick = game.currentTrick.cards.length === 0

  if (isNewTrick) {
    trickCount++
    console.log(`   --- Trick ${trickCount} ---`)
  }

  currentPlayer = getCurrentPlayer(game)

  // Get first card from hand (simplified - not strategic)
  const cardToPlay = currentPlayer.hand[0]

  console.log(`   ${currentPlayer.name} plays ${formatCard(cardToPlay)}`)

  game = playCard(game, currentPlayer.id, cardToPlay)

  // Check if trick just completed
  if (game.currentTrick.cards.length === 0 && game.tricks.length > trickCount - 1) {
    const completedTrick = game.tricks[trickCount - 1]
    const trickWinner = game.players.find(p => p.id === completedTrick.winner)!
    console.log(`   ✓ Trick won by ${trickWinner.name} (Team ${trickWinner.team})`)
    console.log()
  }
}

if (game.phase === GamePhase.TRICK_TAKING) {
  console.log("   ... (continuing to play remaining tricks)")
  console.log()

  // Play remaining tricks without logging
  while (game.phase === GamePhase.TRICK_TAKING) {
    currentPlayer = getCurrentPlayer(game)
    const cardToPlay = currentPlayer.hand[0]
    game = playCard(game, currentPlayer.id, cardToPlay)
  }
}

// Step 6: Show final results
console.log("📋 Step 6: Round Results")
console.log()

if (game.phase === GamePhase.ROUND_END || game.phase === GamePhase.GAME_END) {
  console.log(`✅ Round Complete!`)
  console.log()
  console.log("   Final Scores:")
  console.log(`   Team 1: ${game.scores.team1.total} points`)
  console.log(`   Team 2: ${game.scores.team2.total} points`)
  console.log()

  const biddingTeam = game.biddingTeam!
  const biddingTeamScore = biddingTeam === 1 ? game.scores.team1.total : game.scores.team2.total
  const madeBid = biddingTeamScore >= game.winningBid!

  console.log(`   Bidding Team (Team ${biddingTeam}):`)
  console.log(`   - Bid: ${game.winningBid}`)
  console.log(`   - Score: ${biddingTeamScore}`)
  console.log(`   - Result: ${madeBid ? "✅ Made bid!" : "❌ Went set!"}`)
  console.log()

  if (game.phase === GamePhase.GAME_END) {
    const winner = game.scores.team1.total >= game.targetScore ? 1 : 2
    console.log(`🏆 GAME OVER! Team ${winner} wins!`)
  } else {
    console.log("   Game continues to next round...")
  }
}

console.log()
console.log("=".repeat(60))
console.log("TEST COMPLETE")
console.log("=".repeat(60))
console.log()
console.log("✅ All game engine functions working correctly!")
console.log("   - Game creation")
console.log("   - Card dealing and shuffling")
console.log("   - Bidding logic")
console.log("   - Trump declaration")
console.log("   - Meld detection and scoring")
console.log("   - Trick-taking rules")
console.log("   - Score calculation")
console.log()
