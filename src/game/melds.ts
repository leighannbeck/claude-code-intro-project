import { Card, Suit, Rank, Meld, MeldType, MELD_POINTS } from "@/types/game"
import { getCardsOfSuit, getCardsOfRank, cardsMatch } from "./deck"

/**
 * Finds all valid melds in a hand given the trump suit
 */
export function findMelds(hand: Card[], trumpSuit: Suit): Meld[] {
  const melds: Meld[] = []

  // Check for double melds first (they take priority)
  const doubleRun = findDoubleRun(hand, trumpSuit)
  if (doubleRun) {
    melds.push(doubleRun)
  } else {
    // Only check for single run if no double run
    const run = findRun(hand, trumpSuit)
    if (run) melds.push(run)
  }

  // Check for double pinochle
  const doublePinochle = findDoublePinochle(hand)
  if (doublePinochle) {
    melds.push(doublePinochle)
  } else {
    // Only check for single pinochle if no double
    const pinochle = findPinochle(hand)
    if (pinochle) melds.push(pinochle)
  }

  // Check for around melds (doubles take priority)
  const doubleAces = findDoubleAround(hand, Rank.ACE)
  if (doubleAces) {
    melds.push(doubleAces)
  } else {
    const aces = findAround(hand, Rank.ACE)
    if (aces) melds.push(aces)
  }

  const doubleKings = findDoubleAround(hand, Rank.KING)
  if (doubleKings) {
    melds.push(doubleKings)
  } else {
    const kings = findAround(hand, Rank.KING)
    if (kings) melds.push(kings)
  }

  const doubleQueens = findDoubleAround(hand, Rank.QUEEN)
  if (doubleQueens) {
    melds.push(doubleQueens)
  } else {
    const queens = findAround(hand, Rank.QUEEN)
    if (queens) melds.push(queens)
  }

  const doubleJacks = findDoubleAround(hand, Rank.JACK)
  if (doubleJacks) {
    melds.push(doubleJacks)
  } else {
    const jacks = findAround(hand, Rank.JACK)
    if (jacks) melds.push(jacks)
  }

  // Find all marriages
  const marriages = findAllMarriages(hand, trumpSuit)
  melds.push(...marriages)

  // Find dix (9 of trump)
  const dix = findDix(hand, trumpSuit)
  if (dix) melds.push(dix)

  return melds
}

/**
 * Calculates total meld points for a hand
 */
export function calculateMeldPoints(melds: Meld[]): number {
  return melds.reduce((total, meld) => total + meld.points, 0)
}

// Individual meld finders

function findRun(hand: Card[], trumpSuit: Suit): Meld | null {
  const trumpCards = getCardsOfSuit(hand, trumpSuit)
  const hasAce = trumpCards.some(c => c.rank === Rank.ACE)
  const hasTen = trumpCards.some(c => c.rank === Rank.TEN)
  const hasKing = trumpCards.some(c => c.rank === Rank.KING)
  const hasQueen = trumpCards.some(c => c.rank === Rank.QUEEN)
  const hasJack = trumpCards.some(c => c.rank === Rank.JACK)

  if (hasAce && hasTen && hasKing && hasQueen && hasJack) {
    const cards = [
      trumpCards.find(c => c.rank === Rank.ACE)!,
      trumpCards.find(c => c.rank === Rank.TEN)!,
      trumpCards.find(c => c.rank === Rank.KING)!,
      trumpCards.find(c => c.rank === Rank.QUEEN)!,
      trumpCards.find(c => c.rank === Rank.JACK)!
    ]

    return {
      type: MeldType.RUN,
      cards,
      points: MELD_POINTS[MeldType.RUN]
    }
  }

  return null
}

function findDoubleRun(hand: Card[], trumpSuit: Suit): Meld | null {
  const trumpCards = getCardsOfSuit(hand, trumpSuit)

  // Count how many of each rank we have in trump
  const aceCount = trumpCards.filter(c => c.rank === Rank.ACE).length
  const tenCount = trumpCards.filter(c => c.rank === Rank.TEN).length
  const kingCount = trumpCards.filter(c => c.rank === Rank.KING).length
  const queenCount = trumpCards.filter(c => c.rank === Rank.QUEEN).length
  const jackCount = trumpCards.filter(c => c.rank === Rank.JACK).length

  if (aceCount >= 2 && tenCount >= 2 && kingCount >= 2 && queenCount >= 2 && jackCount >= 2) {
    const aces = trumpCards.filter(c => c.rank === Rank.ACE).slice(0, 2)
    const tens = trumpCards.filter(c => c.rank === Rank.TEN).slice(0, 2)
    const kings = trumpCards.filter(c => c.rank === Rank.KING).slice(0, 2)
    const queens = trumpCards.filter(c => c.rank === Rank.QUEEN).slice(0, 2)
    const jacks = trumpCards.filter(c => c.rank === Rank.JACK).slice(0, 2)

    return {
      type: MeldType.DOUBLE_RUN,
      cards: [...aces, ...tens, ...kings, ...queens, ...jacks],
      points: MELD_POINTS[MeldType.DOUBLE_RUN]
    }
  }

  return null
}

function findAround(hand: Card[], rank: Rank): Meld | null {
  const spade = hand.find(c => c.suit === Suit.SPADES && c.rank === rank)
  const heart = hand.find(c => c.suit === Suit.HEARTS && c.rank === rank)
  const diamond = hand.find(c => c.suit === Suit.DIAMONDS && c.rank === rank)
  const club = hand.find(c => c.suit === Suit.CLUBS && c.rank === rank)

  if (spade && heart && diamond && club) {
    let type: MeldType
    switch (rank) {
      case Rank.ACE: type = MeldType.ACES_AROUND; break
      case Rank.KING: type = MeldType.KINGS_AROUND; break
      case Rank.QUEEN: type = MeldType.QUEENS_AROUND; break
      case Rank.JACK: type = MeldType.JACKS_AROUND; break
      default: return null
    }

    return {
      type,
      cards: [spade, heart, diamond, club],
      points: MELD_POINTS[type]
    }
  }

  return null
}

function findDoubleAround(hand: Card[], rank: Rank): Meld | null {
  const spades = hand.filter(c => c.suit === Suit.SPADES && c.rank === rank)
  const hearts = hand.filter(c => c.suit === Suit.HEARTS && c.rank === rank)
  const diamonds = hand.filter(c => c.suit === Suit.DIAMONDS && c.rank === rank)
  const clubs = hand.filter(c => c.suit === Suit.CLUBS && c.rank === rank)

  if (spades.length >= 2 && hearts.length >= 2 && diamonds.length >= 2 && clubs.length >= 2) {
    let type: MeldType
    switch (rank) {
      case Rank.ACE: type = MeldType.DOUBLE_ACES; break
      case Rank.KING: type = MeldType.DOUBLE_KINGS; break
      case Rank.QUEEN: type = MeldType.DOUBLE_QUEENS; break
      case Rank.JACK: type = MeldType.DOUBLE_JACKS; break
      default: return null
    }

    return {
      type,
      cards: [
        ...spades.slice(0, 2),
        ...hearts.slice(0, 2),
        ...diamonds.slice(0, 2),
        ...clubs.slice(0, 2)
      ],
      points: MELD_POINTS[type]
    }
  }

  return null
}

function findPinochle(hand: Card[]): Meld | null {
  const queenOfSpades = hand.find(c => c.suit === Suit.SPADES && c.rank === Rank.QUEEN)
  const jackOfDiamonds = hand.find(c => c.suit === Suit.DIAMONDS && c.rank === Rank.JACK)

  if (queenOfSpades && jackOfDiamonds) {
    return {
      type: MeldType.PINOCHLE,
      cards: [queenOfSpades, jackOfDiamonds],
      points: MELD_POINTS[MeldType.PINOCHLE]
    }
  }

  return null
}

function findDoublePinochle(hand: Card[]): Meld | null {
  const queensOfSpades = hand.filter(c => c.suit === Suit.SPADES && c.rank === Rank.QUEEN)
  const jacksOfDiamonds = hand.filter(c => c.suit === Suit.DIAMONDS && c.rank === Rank.JACK)

  if (queensOfSpades.length >= 2 && jacksOfDiamonds.length >= 2) {
    return {
      type: MeldType.DOUBLE_PINOCHLE,
      cards: [...queensOfSpades.slice(0, 2), ...jacksOfDiamonds.slice(0, 2)],
      points: MELD_POINTS[MeldType.DOUBLE_PINOCHLE]
    }
  }

  return null
}

function findAllMarriages(hand: Card[], trumpSuit: Suit): Meld[] {
  const marriages: Meld[] = []
  const suits = Object.values(Suit)

  for (const suit of suits) {
    const kings = hand.filter(c => c.suit === suit && c.rank === Rank.KING)
    const queens = hand.filter(c => c.suit === suit && c.rank === Rank.QUEEN)

    // Find pairs of kings and queens
    const pairs = Math.min(kings.length, queens.length)

    for (let i = 0; i < pairs; i++) {
      const isRoyal = suit === trumpSuit

      marriages.push({
        type: isRoyal ? MeldType.ROYAL_MARRIAGE : MeldType.COMMON_MARRIAGE,
        cards: [kings[i], queens[i]],
        points: MELD_POINTS[isRoyal ? MeldType.ROYAL_MARRIAGE : MeldType.COMMON_MARRIAGE]
      })
    }
  }

  return marriages
}

function findDix(hand: Card[], trumpSuit: Suit): Meld | null {
  const dix = hand.find(c => c.suit === trumpSuit && c.rank === Rank.NINE)

  if (dix) {
    return {
      type: MeldType.DIX,
      cards: [dix],
      points: MELD_POINTS[MeldType.DIX]
    }
  }

  return null
}

/**
 * Validates if a meld is still valid (all cards are still in hand)
 */
export function validateMeld(meld: Meld, hand: Card[]): boolean {
  return meld.cards.every(meldCard =>
    hand.some(handCard => handCard.id === meldCard.id)
  )
}

/**
 * Gets a string description of a meld
 */
export function getMeldDescription(meld: Meld): string {
  const typeDescriptions: Record<MeldType, string> = {
    [MeldType.RUN]: "Run (A-10-K-Q-J in trump)",
    [MeldType.DOUBLE_RUN]: "Double Run",
    [MeldType.ACES_AROUND]: "Aces Around",
    [MeldType.DOUBLE_ACES]: "Double Aces Around",
    [MeldType.KINGS_AROUND]: "Kings Around",
    [MeldType.DOUBLE_KINGS]: "Double Kings Around",
    [MeldType.QUEENS_AROUND]: "Queens Around",
    [MeldType.DOUBLE_QUEENS]: "Double Queens Around",
    [MeldType.JACKS_AROUND]: "Jacks Around",
    [MeldType.DOUBLE_JACKS]: "Double Jacks Around",
    [MeldType.PINOCHLE]: "Pinochle (Q♠ J♦)",
    [MeldType.DOUBLE_PINOCHLE]: "Double Pinochle",
    [MeldType.ROYAL_MARRIAGE]: "Royal Marriage (K-Q in trump)",
    [MeldType.COMMON_MARRIAGE]: "Common Marriage (K-Q)",
    [MeldType.DIX]: "Dix (9 of trump)"
  }

  return `${typeDescriptions[meld.type]} (${meld.points} points)`
}
