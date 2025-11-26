# Pinochle Game Engine

This module contains the complete game logic for playing Pinochle, supporting both 4-player and 6-player variants.

## Overview

The game engine is built with a functional, stateless design. Each function takes the current game state and returns a new game state, making it easy to track history, implement undo/redo, and synchronize across clients.

## Module Structure

```
src/game/
├── engine.ts      # Main game state manager
├── deck.ts        # Card deck creation and utilities
├── bidding.ts     # Bidding logic and validation
├── melds.ts       # Meld recognition and scoring
├── tricks.ts      # Trick-taking rules and validation
├── scoring.ts     # Round and game scoring
└── index.ts       # Public API exports
```

## Quick Start

### Creating a New Game

```typescript
import { createGame, GameVariant } from "@/game"

const gameState = createGame(
  "game-123",
  GameVariant.FOUR_PLAYER,
  ["Alice", "Bob", "Charlie", "Diana"],
  500 // target score
)
```

### Starting a Round

```typescript
import { startNewRound } from "@/game"

const newState = startNewRound(gameState)
// Players now have cards dealt to them
// Game phase is BIDDING
```

### Processing Bids

```typescript
import { processBid } from "@/game"

// Player bids
let state = processBid(gameState, "player-0", 25)

// Player passes
state = processBid(state, "player-1", null)

// Continue until bidding is complete
```

### Declaring Trump

```typescript
import { declareTrump, Suit } from "@/game"

const state = declareTrump(gameState, Suit.SPADES)
// Trump is set, melds are automatically found
// Game phase moves to TRICK_TAKING
```

### Playing Cards

```typescript
import { playCard } from "@/game"

const card = getCurrentPlayer(state).hand[0]
const newState = playCard(state, "player-0", card)
```

## Game Flow

1. **WAITING** - Players joining
2. **BIDDING** - Players bid or pass
3. **MELDING** - Trump is declared, melds are found
4. **TRICK_TAKING** - Players play cards
5. **ROUND_END** - Scores calculated
6. **GAME_END** - A team reached the target score

## Key Concepts

### Game State

The `GameState` object contains all information about the current game:
- Players and their hands
- Current phase
- Bids and trump suit
- Tricks played
- Scores

### Immutability

All functions return a new game state rather than modifying the existing one. This ensures:
- Easy debugging and testing
- Ability to implement undo/redo
- Safe concurrent access
- Simple state synchronization

### Validation

The engine validates all moves:
- `isValidBid()` - Checks if a bid is legal
- `isValidPlay()` - Checks if a card can be played
- All game actions throw errors for invalid moves

## Examples

### Complete 4-Player Game Flow

```typescript
import {
  createGame,
  GameVariant,
  startNewRound,
  processBid,
  declareTrump,
  playCard,
  Suit
} from "@/game"

// 1. Create game
let game = createGame(
  "game-1",
  GameVariant.FOUR_PLAYER,
  ["Alice", "Bob", "Charlie", "Diana"]
)

// 2. Start round
game = startNewRound(game)

// 3. Bidding phase
game = processBid(game, "player-0", 25)
game = processBid(game, "player-1", null) // pass
game = processBid(game, "player-2", 26)
game = processBid(game, "player-3", null) // pass
game = processBid(game, "player-0", 27)
game = processBid(game, "player-2", null) // pass
// player-0 wins the bid

// 4. Declare trump
game = declareTrump(game, Suit.HEARTS)

// 5. Play tricks
while (game.phase === GamePhase.TRICK_TAKING) {
  const currentPlayer = getCurrentPlayer(game)
  const validCards = getValidPlays(
    currentPlayer.hand,
    game.currentTrick,
    game.trumpSuit!
  )

  // Play first valid card
  game = playCard(game, currentPlayer.id, validCards[0])
}

// 6. Round complete, check scores
console.log(game.scores)
```

### Finding Melds

```typescript
import { findMelds, calculateMeldPoints, Suit } from "@/game"

const hand = [...] // player's cards
const trumpSuit = Suit.SPADES

const melds = findMelds(hand, trumpSuit)
const totalPoints = calculateMeldPoints(melds)

melds.forEach(meld => {
  console.log(getMeldDescription(meld))
})
```

### Calculating Scores

```typescript
import { calculateRoundResult } from "@/game"

const result = calculateRoundResult(
  players,
  tricks,
  biddingTeam,
  bidAmount,
  currentScores,
  targetScore
)

console.log(`Team 1: ${result.team1Score}`)
console.log(`Team 2: ${result.team2Score}`)
console.log(`Made bid: ${result.biddingTeamMadeBid}`)
console.log(`Game over: ${result.gameOver}`)
```

## Testing

The game engine is designed to be easily testable. All functions are pure (same inputs = same outputs) and don't rely on external state.

```typescript
import { isValidBid } from "@/game"

// Test bidding logic
expect(isValidBid(25, null, 20)).toBe(true)
expect(isValidBid(19, null, 20)).toBe(false)
expect(isValidBid(26, 25)).toBe(true)
expect(isValidBid(25, 25)).toBe(false)
```

## Integration with Real-Time Multiplayer

The game engine can be used with Socket.io or other real-time systems:

1. Server maintains the authoritative game state
2. Clients send move intents (bid, play card)
3. Server validates moves using the engine
4. Server broadcasts new state to all clients
5. Clients render the updated state

## Future Enhancements

Potential additions to the game engine:
- AI player logic for single-player mode
- Game replay functionality
- Advanced statistics and analytics
- Tournament mode support
- Custom rule variations
