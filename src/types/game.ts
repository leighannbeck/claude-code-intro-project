// Card types
export enum Suit {
  SPADES = "SPADES",
  HEARTS = "HEARTS",
  DIAMONDS = "DIAMONDS",
  CLUBS = "CLUBS"
}

export enum Rank {
  JACK = "J",
  QUEEN = "Q",
  KING = "K",
  TEN = "10",
  ACE = "A"
}

export interface Card {
  suit: Suit
  rank: Rank
  id: string // Unique identifier for each card instance
}

// Game phase
export enum GamePhase {
  WAITING = "WAITING",
  BIDDING = "BIDDING",
  MELDING = "MELDING",
  TRICK_TAKING = "TRICK_TAKING",
  ROUND_END = "ROUND_END",
  GAME_END = "GAME_END"
}

// Game variant
export enum GameVariant {
  FOUR_PLAYER = "FOUR_PLAYER",
  SIX_PLAYER = "SIX_PLAYER"
}

// Player
export interface Player {
  id: string
  name: string
  team: 1 | 2 | 3
  position: number
  hand: Card[]
  melds: Meld[]
  tricksTaken: Card[][]
  isReady: boolean
}

// Meld types
export enum MeldType {
  RUN = "RUN",
  DOUBLE_RUN = "DOUBLE_RUN",
  ACES_AROUND = "ACES_AROUND",
  DOUBLE_ACES = "DOUBLE_ACES",
  KINGS_AROUND = "KINGS_AROUND",
  DOUBLE_KINGS = "DOUBLE_KINGS",
  QUEENS_AROUND = "QUEENS_AROUND",
  DOUBLE_QUEENS = "DOUBLE_QUEENS",
  JACKS_AROUND = "JACKS_AROUND",
  DOUBLE_JACKS = "DOUBLE_JACKS",
  PINOCHLE = "PINOCHLE",
  DOUBLE_PINOCHLE = "DOUBLE_PINOCHLE",
  TRIPLE_PINOCHLE = "TRIPLE_PINOCHLE",
  ROYAL_MARRIAGE = "ROYAL_MARRIAGE",
  COMMON_MARRIAGE = "COMMON_MARRIAGE"
}

export interface Meld {
  type: MeldType
  cards: Card[]
  points: number
}

// Bid
export interface Bid {
  playerId: string
  amount: number | null // null means pass
  meldSignal?: number // Optional: signal meld strength to partner (in 10s)
}

// Trick
export interface Trick {
  cards: Array<{
    playerId: string
    card: Card
  }>
  winner?: string
  leadSuit?: Suit
}

// Team scores
export interface TeamScoreData {
  meld: number
  tricks: number
  total: number
  gamesWon: number
}

export interface TeamScore {
  team1: TeamScoreData
  team2: TeamScoreData
  team3?: TeamScoreData // Optional for 6-player games
}

// Game state
export interface GameState {
  id: string
  variant: GameVariant
  phase: GamePhase
  players: Player[]
  currentPlayerIndex: number

  // Bidding
  bids: Bid[]
  currentBidderIndex: number
  winningBid: number | null
  winningBidderId: string | null
  biddingTeam: 1 | 2 | 3 | null

  // Trump
  trumpSuit: Suit | null

  // Tricks
  currentTrick: Trick
  tricks: Trick[]

  // Scores
  scores: TeamScore
  targetScore: number

  // Round info
  dealerIndex: number
  roundNumber: number
}

// Move types for game actions
export enum MoveType {
  BID = "BID",
  PASS = "PASS",
  DECLARE_TRUMP = "DECLARE_TRUMP",
  DECLARE_MELD = "DECLARE_MELD",
  PLAY_CARD = "PLAY_CARD"
}

export interface GameMove {
  playerId: string
  type: MoveType
  data: any
  timestamp: Date
}

// Meld scoring values
export const MELD_POINTS: Record<MeldType, number> = {
  [MeldType.RUN]: 15,
  [MeldType.DOUBLE_RUN]: 150,
  [MeldType.ACES_AROUND]: 10,
  [MeldType.DOUBLE_ACES]: 100,
  [MeldType.KINGS_AROUND]: 8,
  [MeldType.DOUBLE_KINGS]: 80,
  [MeldType.QUEENS_AROUND]: 6,
  [MeldType.DOUBLE_QUEENS]: 60,
  [MeldType.JACKS_AROUND]: 4,
  [MeldType.DOUBLE_JACKS]: 40,
  [MeldType.PINOCHLE]: 4,
  [MeldType.DOUBLE_PINOCHLE]: 30,
  [MeldType.TRIPLE_PINOCHLE]: 90,
  [MeldType.ROYAL_MARRIAGE]: 4,
  [MeldType.COMMON_MARRIAGE]: 2
}

// Card point values for tricks
export const TRICK_CARD_POINTS: Record<Rank, number> = {
  [Rank.ACE]: 1,
  [Rank.TEN]: 1,
  [Rank.KING]: 1,
  [Rank.QUEEN]: 0,
  [Rank.JACK]: 0
}

// Card ranking for trick-taking (higher number = higher rank)
// A > 10 > K > Q > J
export const CARD_RANK_VALUES: Record<Rank, number> = {
  [Rank.ACE]: 5,
  [Rank.TEN]: 4,
  [Rank.KING]: 3,
  [Rank.QUEEN]: 2,
  [Rank.JACK]: 1
}
