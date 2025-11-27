import {
  GameState,
  GamePhase,
  GameVariant,
  Player,
  Card,
  Suit,
  Bid,
  Trick
} from "@/types/game"
import { createMultipleDecks, shuffleDeck, dealCards } from "./deck"
import { isValidBid, isBiddingComplete, getWinningBidder, getHighestBid } from "./bidding"
import { findMelds, hasMarriage, getSuitsWithMarriage } from "./melds"
import {
  isValidPlay,
  determineTrickWinner,
  isTrickComplete,
  createTrick,
  addCardToTrick
} from "./tricks"
import { calculateRoundResult } from "./scoring"

/**
 * Creates a new game state
 */
export function createGame(
  gameId: string,
  variant: GameVariant,
  playerNames: string[],
  targetScore: number = 500
): GameState {
  const numPlayers = variant === GameVariant.FOUR_PLAYER ? 4 : 6

  if (playerNames.length !== numPlayers) {
    throw new Error(`${variant} requires ${numPlayers} players`)
  }

  // Create players and assign teams
  // 4-player: 2 teams (alternating 1, 2, 1, 2)
  // 6-player: 3 teams (alternating 1, 2, 3, 1, 2, 3)
  const players: Player[] = playerNames.map((name, index) => {
    let team: 1 | 2 | 3
    if (numPlayers === 4) {
      team = (index % 2 === 0) ? 1 : 2
    } else {
      team = ((index % 3) + 1) as 1 | 2 | 3
    }

    return {
      id: `player-${index}`,
      name,
      team,
      position: index,
      hand: [],
      melds: [],
      tricksTaken: [],
      isReady: false
    }
  })

  return {
    id: gameId,
    variant,
    phase: GamePhase.WAITING,
    players,
    currentPlayerIndex: 0,
    bids: [],
    currentBidderIndex: 0,
    winningBid: null,
    winningBidderId: null,
    biddingTeam: null,
    trumpSuit: null,
    currentTrick: { cards: [], leadSuit: undefined },
    tricks: [],
    scores: {
      team1: { meld: 0, tricks: 0, total: 0, gamesWon: 0 },
      team2: { meld: 0, tricks: 0, total: 0, gamesWon: 0 },
      ...(numPlayers === 6 && {
        team3: { meld: 0, tricks: 0, total: 0, gamesWon: 0 }
      })
    },
    targetScore,
    dealerIndex: 0,
    roundNumber: 0
  }
}

/**
 * Starts a new round - deals cards and begins bidding
 * 4-player uses 2 decks, 6-player uses 3 decks
 */
export function startNewRound(gameState: GameState): GameState {
  const numPlayers = gameState.players.length
  const numDecks = numPlayers === 4 ? 2 : 3 // 2 decks for 4-player, 3 for 6-player
  const deck = shuffleDeck(createMultipleDecks(numDecks))
  const hands = dealCards(deck, numPlayers as 4 | 6, gameState.dealerIndex)

  // Update players with their hands
  const updatedPlayers = gameState.players.map((player, index) => ({
    ...player,
    hand: hands[index],
    melds: [],
    tricksTaken: []
  }))

  // Rotate dealer clockwise
  const newDealerIndex = (gameState.dealerIndex + 1) % numPlayers

  return {
    ...gameState,
    phase: GamePhase.BIDDING,
    players: updatedPlayers,
    bids: [],
    currentBidderIndex: (newDealerIndex + 1) % numPlayers, // Start bidding to left of dealer
    winningBid: null,
    winningBidderId: null,
    biddingTeam: null,
    trumpSuit: null,
    currentTrick: { cards: [], leadSuit: undefined },
    tricks: [],
    dealerIndex: newDealerIndex,
    roundNumber: gameState.roundNumber + 1
  }
}

/**
 * Processes a bid from a player
 */
export function processBid(
  gameState: GameState,
  playerId: string,
  bidAmount: number | null // null means pass
): GameState {
  if (gameState.phase !== GamePhase.BIDDING) {
    throw new Error("Not in bidding phase")
  }

  const currentPlayer = gameState.players[gameState.currentBidderIndex]
  if (currentPlayer.id !== playerId) {
    throw new Error("Not this player's turn to bid")
  }

  // Validate bid if not passing
  if (bidAmount !== null) {
    // Check if player has at least one marriage (required to bid)
    if (!hasMarriage(currentPlayer.hand)) {
      throw new Error("Must have at least one marriage (K+Q) to bid")
    }

    const currentHighest = getHighestBid(gameState.bids)
    if (!isValidBid(bidAmount, currentHighest)) {
      throw new Error("Invalid bid amount")
    }
  }

  const newBid: Bid = { playerId, amount: bidAmount }
  const updatedBids = [...gameState.bids, newBid]

  // Check if bidding is complete
  const biddingComplete = isBiddingComplete(updatedBids, gameState.players.length)

  if (biddingComplete) {
    const winnerId = getWinningBidder(updatedBids)!
    const winningAmount = getHighestBid(updatedBids)!
    const winner = gameState.players.find(p => p.id === winnerId)!

    return {
      ...gameState,
      bids: updatedBids,
      winningBid: winningAmount,
      winningBidderId: winnerId,
      biddingTeam: winner.team,
      phase: GamePhase.MELDING,
      currentPlayerIndex: gameState.players.findIndex(p => p.id === winnerId)
    }
  }

  // Move to next bidder
  const nextBidderIndex = (gameState.currentBidderIndex + 1) % gameState.players.length

  return {
    ...gameState,
    bids: updatedBids,
    currentBidderIndex: nextBidderIndex
  }
}

/**
 * Declares trump suit (done by winning bidder)
 */
export function declareTrump(gameState: GameState, trumpSuit: Suit): GameState {
  if (gameState.phase !== GamePhase.MELDING) {
    throw new Error("Not in melding phase")
  }

  // Get the winning bidder
  const winningBidder = gameState.players.find(p => p.id === gameState.winningBidderId)
  if (!winningBidder) {
    throw new Error("Winning bidder not found")
  }

  // Validate that trump can only be declared in suits where player has K+Q
  const availableSuits = getSuitsWithMarriage(winningBidder.hand)
  if (!availableSuits.includes(trumpSuit)) {
    throw new Error("Can only call trump in a suit where you have a marriage (K+Q)")
  }

  // Find melds for all players now that trump is declared
  const updatedPlayers = gameState.players.map(player => ({
    ...player,
    melds: findMelds(player.hand, trumpSuit)
  }))

  return {
    ...gameState,
    trumpSuit,
    players: updatedPlayers,
    phase: GamePhase.TRICK_TAKING,
    currentPlayerIndex: gameState.players.findIndex(p => p.id === gameState.winningBidderId)
  }
}

/**
 * Plays a card for the current player
 */
export function playCard(
  gameState: GameState,
  playerId: string,
  card: Card
): GameState {
  if (gameState.phase !== GamePhase.TRICK_TAKING) {
    throw new Error("Not in trick-taking phase")
  }

  const currentPlayer = gameState.players[gameState.currentPlayerIndex]
  if (currentPlayer.id !== playerId) {
    throw new Error("Not this player's turn")
  }

  if (!gameState.trumpSuit) {
    throw new Error("Trump suit not declared")
  }

  // Validate the play
  if (!isValidPlay(card, currentPlayer.hand, gameState.currentTrick, gameState.trumpSuit)) {
    throw new Error("Invalid card play")
  }

  // Remove card from player's hand
  const updatedPlayers = gameState.players.map(p =>
    p.id === playerId
      ? { ...p, hand: p.hand.filter(c => c.id !== card.id) }
      : p
  )

  // Add card to current trick
  let updatedTrick: Trick
  if (gameState.currentTrick.cards.length === 0) {
    updatedTrick = createTrick(card, playerId)
  } else {
    updatedTrick = addCardToTrick(gameState.currentTrick, card, playerId)
  }

  // Check if trick is complete
  const trickComplete = isTrickComplete(updatedTrick, gameState.players.length)

  if (trickComplete) {
    // Determine winner
    const winnerId = determineTrickWinner(updatedTrick, gameState.trumpSuit)
    updatedTrick.winner = winnerId

    const completedTricks = [...gameState.tricks, updatedTrick]

    // Check if round is complete (all cards played)
    const roundComplete = updatedPlayers.every(p => p.hand.length === 0)

    if (roundComplete) {
      // Calculate scores and check for game winner
      const result = calculateRoundResult(
        updatedPlayers,
        completedTricks,
        gameState.biddingTeam!,
        gameState.winningBid!,
        gameState.scores,
        gameState.targetScore
      )

      const newScores: any = {
        team1: {
          ...gameState.scores.team1,
          total: result.team1Score,
          gamesWon: result.winner === 1
            ? gameState.scores.team1.gamesWon + 1
            : gameState.scores.team1.gamesWon
        },
        team2: {
          ...gameState.scores.team2,
          total: result.team2Score,
          gamesWon: result.winner === 2
            ? gameState.scores.team2.gamesWon + 1
            : gameState.scores.team2.gamesWon
        }
      }

      // Add team3 scores for 6-player games
      if (gameState.players.length === 6 && gameState.scores.team3 && result.team3Score !== undefined) {
        newScores.team3 = {
          ...gameState.scores.team3,
          total: result.team3Score,
          gamesWon: result.winner === 3
            ? gameState.scores.team3.gamesWon + 1
            : gameState.scores.team3.gamesWon
        }
      }

      return {
        ...gameState,
        players: updatedPlayers,
        currentTrick: { cards: [], leadSuit: undefined },
        tricks: completedTricks,
        phase: result.gameOver ? GamePhase.GAME_END : GamePhase.ROUND_END,
        scores: newScores
      }
    }

    // Start next trick with winner leading
    const winnerIndex = gameState.players.findIndex(p => p.id === winnerId)

    return {
      ...gameState,
      players: updatedPlayers,
      currentTrick: { cards: [], leadSuit: undefined },
      tricks: completedTricks,
      currentPlayerIndex: winnerIndex
    }
  }

  // Move to next player
  const nextPlayerIndex = (gameState.currentPlayerIndex + 1) % gameState.players.length

  return {
    ...gameState,
    players: updatedPlayers,
    currentTrick: updatedTrick,
    currentPlayerIndex: nextPlayerIndex
  }
}

/**
 * Gets the current player
 */
export function getCurrentPlayer(gameState: GameState): Player {
  return gameState.players[gameState.currentPlayerIndex]
}

/**
 * Gets a player by ID
 */
export function getPlayer(gameState: GameState, playerId: string): Player | undefined {
  return gameState.players.find(p => p.id === playerId)
}

/**
 * Checks if it's a specific player's turn
 */
export function isPlayerTurn(gameState: GameState, playerId: string): boolean {
  return getCurrentPlayer(gameState).id === playerId
}
