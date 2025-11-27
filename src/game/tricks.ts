import { Card, Suit, Trick, CARD_RANK_VALUES, TRICK_CARD_POINTS } from "@/types/game"
import { getCardsOfSuit } from "./deck"

/**
 * Validates if a card can be legally played given the current trick
 * @param card The card to play
 * @param hand The player's current hand
 * @param trick The current trick in progress
 * @param trumpSuit The trump suit for this round
 * @returns true if the play is legal
 */
export function isValidPlay(
  card: Card,
  hand: Card[],
  trick: Trick,
  trumpSuit: Suit
): boolean {
  // First card of trick - any card is valid
  if (trick.cards.length === 0) {
    return hand.some(c => c.id === card.id)
  }

  const leadSuit = trick.leadSuit!
  const ledCard = trick.cards[0].card
  const cardsOfLedSuit = getCardsOfSuit(hand, leadSuit)
  const trumpCards = getCardsOfSuit(hand, trumpSuit)

  // Rule 1: Must follow suit if possible
  if (cardsOfLedSuit.length > 0) {
    // Must play the led suit
    if (card.suit !== leadSuit) {
      return false
    }

    // Rule 2: Must play higher if possible when following suit
    const highestCardInTrick = getHighestCardInTrick(trick.cards, leadSuit, trumpSuit)
    if (highestCardInTrick) {
      const higherCards = cardsOfLedSuit.filter(c =>
        CARD_RANK_VALUES[c.rank] > CARD_RANK_VALUES[highestCardInTrick.rank]
      )

      // If we have higher cards, must play one of them
      if (higherCards.length > 0) {
        return higherCards.some(c => c.id === card.id)
      }
    }

    return true
  }

  // Rule 3: If can't follow suit, must play trump if possible
  if (leadSuit !== trumpSuit && trumpCards.length > 0) {
    if (card.suit !== trumpSuit) {
      return false
    }

    // Must play higher trump if possible (even if it beats your partner)
    const highestCardInTrick = getHighestCardInTrick(trick.cards, leadSuit, trumpSuit)
    if (highestCardInTrick && highestCardInTrick.suit === trumpSuit) {
      const higherTrumps = trumpCards.filter(c =>
        CARD_RANK_VALUES[c.rank] > CARD_RANK_VALUES[highestCardInTrick.rank]
      )

      if (higherTrumps.length > 0) {
        return higherTrumps.some(c => c.id === card.id)
      }
    }

    return true
  }

  // Rule 4: If can't follow suit or trump, can play any card
  return true
}

/**
 * Determines the winner of a completed trick
 * Tie-breaker: If two cards are equal, the first one played wins
 * @param trick The completed trick
 * @param trumpSuit The trump suit
 * @returns The playerId of the winner
 */
export function determineTrickWinner(trick: Trick, trumpSuit: Suit): string {
  if (trick.cards.length === 0) {
    throw new Error("Cannot determine winner of empty trick")
  }

  const leadSuit = trick.leadSuit!

  // Check if any trump was played
  const trumpsPlayed = trick.cards.filter(tc => tc.card.suit === trumpSuit)

  if (trumpsPlayed.length > 0) {
    // Highest trump wins (first card wins in case of tie)
    const highestTrump = trumpsPlayed.reduce((highest, current) =>
      CARD_RANK_VALUES[current.card.rank] > CARD_RANK_VALUES[highest.card.rank]
        ? current
        : highest // Keep highest if equal (first card played)
    )
    return highestTrump.playerId
  }

  // No trump played, highest card of led suit wins (first card wins in case of tie)
  const cardsOfLedSuit = trick.cards.filter(tc => tc.card.suit === leadSuit)
  const highestCard = cardsOfLedSuit.reduce((highest, current) =>
    CARD_RANK_VALUES[current.card.rank] > CARD_RANK_VALUES[highest.card.rank]
      ? current
      : highest // Keep highest if equal (first card played)
  )

  return highestCard.playerId
}

/**
 * Calculates the point value of a trick
 */
export function calculateTrickPoints(cards: Card[]): number {
  return cards.reduce((total, card) => {
    return total + TRICK_CARD_POINTS[card.rank]
  }, 0)
}

/**
 * Gets the highest card currently in the trick
 */
function getHighestCardInTrick(
  trickCards: Array<{ playerId: string; card: Card }>,
  leadSuit: Suit,
  trumpSuit: Suit
): Card | null {
  if (trickCards.length === 0) return null

  // Check for trump cards
  const trumpCards = trickCards.filter(tc => tc.card.suit === trumpSuit)
  if (trumpCards.length > 0) {
    return trumpCards.reduce((highest, current) =>
      CARD_RANK_VALUES[current.card.rank] > CARD_RANK_VALUES[highest.rank]
        ? current.card
        : highest
    , trumpCards[0].card)
  }

  // No trump, find highest of led suit
  const ledSuitCards = trickCards.filter(tc => tc.card.suit === leadSuit)
  if (ledSuitCards.length === 0) return trickCards[0].card

  return ledSuitCards.reduce((highest, current) =>
    CARD_RANK_VALUES[current.card.rank] > CARD_RANK_VALUES[highest.rank]
      ? current.card
      : highest
  , ledSuitCards[0].card)
}

/**
 * Gets all valid cards that can be played from a hand
 */
export function getValidPlays(
  hand: Card[],
  trick: Trick,
  trumpSuit: Suit
): Card[] {
  return hand.filter(card => isValidPlay(card, hand, trick, trumpSuit))
}

/**
 * Checks if a trick is complete (all players have played)
 */
export function isTrickComplete(trick: Trick, numPlayers: number): boolean {
  return trick.cards.length === numPlayers
}

/**
 * Creates a new empty trick with the lead card
 */
export function createTrick(leadCard: Card, leadPlayerId: string): Trick {
  return {
    cards: [{
      playerId: leadPlayerId,
      card: leadCard
    }],
    leadSuit: leadCard.suit
  }
}

/**
 * Adds a card to an existing trick
 */
export function addCardToTrick(
  trick: Trick,
  card: Card,
  playerId: string
): Trick {
  return {
    ...trick,
    cards: [
      ...trick.cards,
      { playerId, card }
    ]
  }
}

/**
 * Calculates total trick points won by a team across all tricks
 */
export function calculateTeamTrickPoints(
  tricks: Trick[],
  teamPlayerIds: string[]
): number {
  let total = 0

  for (const trick of tricks) {
    if (trick.winner && teamPlayerIds.includes(trick.winner)) {
      const cards = trick.cards.map(tc => tc.card)
      total += calculateTrickPoints(cards)
    }
  }

  return total
}
