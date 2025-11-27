import { Card, Suit, Rank, CARD_RANK_VALUES } from "@/types/game"

/**
 * Creates a standard Pinochle deck with 40 cards
 * (two copies of 10, J, Q, K, A in each suit - no 9's)
 */
export function createPinochleDeck(): Card[] {
  const deck: Card[] = []
  const suits = Object.values(Suit)
  const ranks = Object.values(Rank)

  // Create two copies of each card
  for (let copy = 1; copy <= 2; copy++) {
    for (const suit of suits) {
      for (const rank of ranks) {
        deck.push({
          suit,
          rank,
          id: `${suit}-${rank}-${copy}`
        })
      }
    }
  }

  return deck
}

/**
 * Creates multiple Pinochle decks and combines them
 * @param numDecks Number of decks to create (2 for 4-player, 3 for 6-player)
 */
export function createMultipleDecks(numDecks: number): Card[] {
  const allCards: Card[] = []

  for (let deckNum = 0; deckNum < numDecks; deckNum++) {
    const deck = createPinochleDeck()
    // Update IDs to include deck number for uniqueness
    deck.forEach(card => {
      card.id = `${card.suit}-${card.rank}-${card.id.split('-')[2]}-deck${deckNum}`
    })
    allCards.push(...deck)
  }

  return allCards
}

/**
 * Shuffles an array using Fisher-Yates algorithm
 */
export function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

/**
 * Deals cards to players
 * Deal 4 cards at a time to each player in clockwise order
 * @param deck The shuffled deck
 * @param numPlayers Number of players (4 or 6)
 * @param dealerIndex The position of the dealer (deals start to the left/clockwise)
 * @returns Array of hands, one for each player
 */
export function dealCards(deck: Card[], numPlayers: 4 | 6, dealerIndex: number = 0): Card[][] {
  const cardsPerPlayer = numPlayers === 4 ? 12 : 8
  const hands: Card[][] = Array.from({ length: numPlayers }, () => [])

  let deckIndex = 0
  const cardsPerDeal = 4 // Deal 4 cards at a time

  // Continue dealing until all players have their cards
  while (hands.some(hand => hand.length < cardsPerPlayer)) {
    // Start dealing from the player to the left of dealer (clockwise)
    for (let offset = 1; offset <= numPlayers; offset++) {
      const playerIndex = (dealerIndex + offset) % numPlayers

      // Deal 4 cards to this player (or remaining cards needed)
      const cardsToDeal = Math.min(cardsPerDeal, cardsPerPlayer - hands[playerIndex].length)

      for (let i = 0; i < cardsToDeal && deckIndex < deck.length; i++) {
        hands[playerIndex].push(deck[deckIndex])
        deckIndex++
      }

      // Stop if this player has all their cards
      if (hands[playerIndex].length >= cardsPerPlayer) {
        continue
      }
    }
  }

  // Sort each hand by suit and rank for easier viewing
  return hands.map(hand => sortHand(hand))
}

/**
 * Sorts a hand of cards by suit and rank
 */
export function sortHand(hand: Card[]): Card[] {
  const suitOrder: Record<Suit, number> = {
    [Suit.SPADES]: 0,
    [Suit.HEARTS]: 1,
    [Suit.DIAMONDS]: 2,
    [Suit.CLUBS]: 3
  }

  return [...hand].sort((a, b) => {
    // First sort by suit
    if (a.suit !== b.suit) {
      return suitOrder[a.suit] - suitOrder[b.suit]
    }
    // Then by rank value (descending)
    return CARD_RANK_VALUES[b.rank] - CARD_RANK_VALUES[a.rank]
  })
}

/**
 * Checks if two cards are the same (same suit and rank, not necessarily same ID)
 */
export function cardsMatch(card1: Card, card2: Card): boolean {
  return card1.suit === card2.suit && card1.rank === card2.rank
}

/**
 * Checks if a card is in a hand
 */
export function hasCard(hand: Card[], card: Card): boolean {
  return hand.some(c => c.id === card.id)
}

/**
 * Removes a card from a hand
 */
export function removeCard(hand: Card[], card: Card): Card[] {
  return hand.filter(c => c.id !== card.id)
}

/**
 * Gets all cards of a specific suit from a hand
 */
export function getCardsOfSuit(hand: Card[], suit: Suit): Card[] {
  return hand.filter(card => card.suit === suit)
}

/**
 * Gets all cards of a specific rank from a hand
 */
export function getCardsOfRank(hand: Card[], rank: Rank): Card[] {
  return hand.filter(card => card.rank === rank)
}

/**
 * Counts how many cards of each suit are in a hand
 */
export function countSuits(hand: Card[]): Record<Suit, number> {
  return {
    [Suit.SPADES]: getCardsOfSuit(hand, Suit.SPADES).length,
    [Suit.HEARTS]: getCardsOfSuit(hand, Suit.HEARTS).length,
    [Suit.DIAMONDS]: getCardsOfSuit(hand, Suit.DIAMONDS).length,
    [Suit.CLUBS]: getCardsOfSuit(hand, Suit.CLUBS).length
  }
}

/**
 * Formats a card as a string for display
 */
export function formatCard(card: Card): string {
  const suitSymbols: Record<Suit, string> = {
    [Suit.SPADES]: "♠",
    [Suit.HEARTS]: "♥",
    [Suit.DIAMONDS]: "♦",
    [Suit.CLUBS]: "♣"
  }
  return `${card.rank}${suitSymbols[card.suit]}`
}

/**
 * Formats multiple cards as a string
 */
export function formatCards(cards: Card[]): string {
  return cards.map(formatCard).join(" ")
}
