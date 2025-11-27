import { useState } from "react"
import { Bid } from "@/types/game"

interface BiddingInterfaceProps {
  currentBid: number | null
  minBid: number
  onBid: (amount: number) => void
  onPass: () => void
  bids: Bid[]
  currentPlayerName: string
  isCurrentPlayer: boolean
}

export default function BiddingInterface({
  currentBid,
  minBid,
  onBid,
  onPass,
  bids,
  currentPlayerName,
  isCurrentPlayer,
}: BiddingInterfaceProps) {
  const [selectedBid, setSelectedBid] = useState<number>(minBid)

  // Generate bid options based on current bid
  const bidOptions = []
  const maxDisplayBid = 200 // Reasonable display limit (no actual max)

  if (currentBid === null || currentBid < 60) {
    // Below 60: increment by 1 (any amount)
    const start = currentBid === null ? minBid : currentBid + 1
    for (let i = start; i <= Math.min(60, maxDisplayBid); i++) {
      bidOptions.push(i)
    }
  }

  if (currentBid === null || currentBid < 60) {
    // Add options from 60 onwards in increments of 5
    for (let i = 60; i <= maxDisplayBid; i += 5) {
      if (currentBid === null || i > currentBid) {
        bidOptions.push(i)
      }
    }
  } else {
    // Current bid is 60 or higher: increment by 5 only
    for (let i = currentBid + 5; i <= maxDisplayBid; i += 5) {
      bidOptions.push(i)
    }
  }

  const handleBidSubmit = () => {
    if (selectedBid >= minBid) {
      onBid(selectedBid)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Bidding Phase</h2>

      {/* Current bidder indicator */}
      <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm font-semibold text-blue-900">
          {isCurrentPlayer ? "Your turn to bid" : `Waiting for ${currentPlayerName}...`}
        </p>
        {currentBid !== null && (
          <p className="text-sm text-gray-600 mt-1">
            Current bid: <span className="font-bold">{currentBid}</span>
          </p>
        )}
      </div>

      {/* Bid history */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Bid History:</h3>
        <div className="space-y-1 max-h-32 overflow-y-auto">
          {bids.length === 0 ? (
            <p className="text-sm text-gray-500">No bids yet</p>
          ) : (
            bids.map((bid, index) => (
              <div key={index} className="text-sm flex justify-between">
                <span className="font-medium">{bid.playerName}:</span>
                <span className={bid.amount === null ? "text-gray-500" : "text-blue-600 font-bold"}>
                  {bid.amount === null ? "Pass" : bid.amount}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bidding controls */}
      {isCurrentPlayer && (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select your bid (minimum: {minBid})
            </label>
            <select
              value={selectedBid}
              onChange={(e) => setSelectedBid(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {bidOptions.map((bid) => (
                <option key={bid} value={bid}>
                  {bid}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleBidSubmit}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              Bid {selectedBid}
            </button>
            <button
              onClick={onPass}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              Pass
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
