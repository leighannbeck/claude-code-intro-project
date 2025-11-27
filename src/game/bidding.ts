import { Bid } from "@/types/game"

/**
 * Validates if a bid is legal given the current highest bid
 * @param bidAmount The bid amount to validate
 * @param currentHighestBid The current highest bid (null if no bids yet)
 * @param minimumBid The minimum starting bid (default 50)
 * @returns true if the bid is valid
 */
export function isValidBid(
  bidAmount: number,
  currentHighestBid: number | null,
  minimumBid: number = 50
): boolean {
  // If no bids yet, must be at least the minimum
  if (currentHighestBid === null) {
    return bidAmount >= minimumBid
  }

  // Must be higher than current highest bid
  if (bidAmount <= currentHighestBid) {
    return false
  }

  // Once bid reaches 60, must increment by 5
  if (currentHighestBid >= 60) {
    // Bid must be in increments of 5
    return bidAmount % 5 === 0
  }

  // Below 60, any increment is allowed
  return true
}

/**
 * Gets the current highest bid from an array of bids
 */
export function getHighestBid(bids: Bid[]): number | null {
  const numericBids = bids
    .map(b => b.amount)
    .filter((amount): amount is number => amount !== null)

  if (numericBids.length === 0) return null

  return Math.max(...numericBids)
}

/**
 * Gets the winning bidder from an array of bids
 */
export function getWinningBidder(bids: Bid[]): string | null {
  const highestBid = getHighestBid(bids)
  if (highestBid === null) return null

  const winningBid = bids.find(b => b.amount === highestBid)
  return winningBid?.playerId || null
}

/**
 * Checks if bidding is complete (all players except one have passed)
 */
export function isBiddingComplete(
  bids: Bid[],
  numPlayers: number
): boolean {
  // Need at least as many bids as players for first round
  if (bids.length < numPlayers) return false

  // Count how many players have passed (bid null)
  const passes = bids.filter(b => b.amount === null).length

  // Count unique players who have bid
  const uniqueBidders = new Set(bids.map(b => b.playerId))

  // Bidding is complete when all but one player has passed
  // and we've had at least a full round of bidding
  return passes === numPlayers - 1 && uniqueBidders.size === numPlayers
}

/**
 * Determines if a player can still bid (hasn't passed yet)
 */
export function canPlayerBid(bids: Bid[], playerId: string): boolean {
  // Find the most recent bid from this player
  const playerBids = bids.filter(b => b.playerId === playerId)
  if (playerBids.length === 0) return true

  const mostRecentBid = playerBids[playerBids.length - 1]
  // If they passed (bid null), they can't bid anymore
  return mostRecentBid.amount !== null
}

/**
 * Suggests a reasonable bid based on meld points and hand strength
 * This is a helper for AI or beginner players
 */
export function suggestBid(
  meldPoints: number,
  trumpLength: number,
  highCards: number // Number of Aces and Tens
): number {
  // Base bid on meld points
  let suggestedBid = meldPoints

  // Add points for trump length (strong trump suit helps win tricks)
  if (trumpLength >= 6) suggestedBid += 5
  if (trumpLength >= 8) suggestedBid += 5

  // Add points for high cards
  suggestedBid += highCards * 2

  // Round up to nearest 5
  suggestedBid = Math.ceil(suggestedBid / 5) * 5

  // Ensure it's at least the minimum
  return Math.max(suggestedBid, 50)
}

/**
 * Gets the minimum bid increment
 * Below 60: increment by 1 (any amount)
 * 60 and above: increment by 5
 */
export const BID_INCREMENT = 1
export const BID_INCREMENT_ABOVE_60 = 5

/**
 * Gets the default minimum bid
 */
export const DEFAULT_MINIMUM_BID = 50

/**
 * Gets the threshold where bid increment changes to 5
 */
export const BID_INCREMENT_THRESHOLD = 60
