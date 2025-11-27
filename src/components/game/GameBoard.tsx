"use client"

import { useState } from "react"
import { GameState, GamePhase, Suit, Card as CardType } from "@/types/game"
import { getCurrentPlayer, getValidPlays, getSuitsWithMarriage } from "@/game"
import { DEFAULT_MINIMUM_BID } from "@/game/bidding"
import BiddingInterface from "./BiddingInterface"
import TrumpSelector from "./TrumpSelector"
import MeldDisplay from "./MeldDisplay"
import TrickArea from "./TrickArea"
import ScoreBoard from "./ScoreBoard"
import PlayerHand from "./PlayerHand"

interface GameBoardProps {
  gameState: GameState
  currentUserId: string
  onBid: (amount: number | null) => void
  onDeclareTrump: (suit: Suit) => void
  onPlayCard: (card: CardType) => void
}

export default function GameBoard({
  gameState,
  currentUserId,
  onBid,
  onDeclareTrump,
  onPlayCard,
}: GameBoardProps) {
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null)

  // Find current player based on userId
  const currentPlayerIndex = parseInt(currentUserId.split("-")[1] || "0")
  const currentPlayer = gameState.players[currentPlayerIndex]

  if (!currentPlayer) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-red-600 font-semibold">Error: Player not found</div>
      </div>
    )
  }

  const activePlayer = getCurrentPlayer(gameState)
  const isCurrentPlayerTurn = activePlayer.id === currentPlayer.id

  // Get valid cards for current player
  const validCards =
    gameState.phase === GamePhase.TRICK_TAKING && isCurrentPlayerTurn
      ? getValidPlays(currentPlayer.hand, gameState.currentTrick, gameState.trumpSuit!)
      : []

  const handleCardClick = (card: CardType) => {
    if (!isCurrentPlayerTurn || gameState.phase !== GamePhase.TRICK_TAKING) return

    if (selectedCard?.id === card.id) {
      setSelectedCard(null)
    } else {
      setSelectedCard(card)
    }
  }

  const handlePlayCard = () => {
    if (selectedCard && isCurrentPlayerTurn) {
      onPlayCard(selectedCard)
      setSelectedCard(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Game header */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Pinochle Game - Room {gameState.id}
              </h1>
              <p className="text-sm text-gray-600">
                Phase: <span className="font-semibold">{gameState.phase}</span>
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Your turn:</div>
              <div
                className={`text-lg font-bold ${
                  isCurrentPlayerTurn ? "text-green-600" : "text-gray-400"
                }`}
              >
                {isCurrentPlayerTurn ? "Yes" : "No"}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main game area - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Phase-specific UI */}
            {gameState.phase === GamePhase.BIDDING && (
              <BiddingInterface
                currentBid={gameState.winningBid}
                minBid={
                  gameState.winningBid !== null
                    ? gameState.winningBid + 1
                    : DEFAULT_MINIMUM_BID
                }
                onBid={onBid}
                onPass={() => onBid(null)}
                bids={gameState.bids.map((bid, idx) => ({
                  playerId: bid.playerId,
                  playerName: gameState.players.find(p => p.id === bid.playerId)?.name || "Unknown",
                  amount: bid.amount,
                }))}
                currentPlayerName={activePlayer.name}
                isCurrentPlayer={isCurrentPlayerTurn}
              />
            )}

            {gameState.phase === GamePhase.MELDING &&
              gameState.winningBidderId === currentPlayer.id && (
                <TrumpSelector
                  onSelectTrump={onDeclareTrump}
                  winningBid={gameState.winningBid!}
                  winnerName={currentPlayer.name}
                  availableSuits={getSuitsWithMarriage(currentPlayer.hand)}
                />
              )}

            {gameState.phase === GamePhase.MELDING &&
              gameState.winningBidderId !== currentPlayer.id && (
                <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                  <div className="text-gray-600 mb-2">
                    Waiting for{" "}
                    {gameState.players.find(p => p.id === gameState.winningBidderId)?.name}{" "}
                    to declare trump...
                  </div>
                  <div className="text-sm text-gray-500">
                    Bid: {gameState.winningBid}
                  </div>
                </div>
              )}

            {(gameState.phase === GamePhase.MELDING || gameState.phase === GamePhase.TRICK_TAKING) && (
              <MeldDisplay
                players={gameState.players}
                currentUserId={currentPlayer.id}
              />
            )}

            {gameState.phase === GamePhase.TRICK_TAKING && (
              <TrickArea
                currentTrick={gameState.currentTrick}
                trumpSuit={gameState.trumpSuit}
                playerNames={gameState.players.map(p => p.name)}
                completedTricks={gameState.tricks.length}
              />
            )}

            {/* Player's hand */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Your Hand</h2>
                <div className="text-sm text-gray-600">
                  {currentPlayer.hand.length} cards
                </div>
              </div>

              <PlayerHand
                cards={currentPlayer.hand}
                onCardClick={
                  gameState.phase === GamePhase.TRICK_TAKING
                    ? handleCardClick
                    : undefined
                }
                validCards={validCards}
                selectedCard={selectedCard}
              />

              {gameState.phase === GamePhase.TRICK_TAKING &&
                isCurrentPlayerTurn &&
                selectedCard && (
                  <button
                    onClick={handlePlayCard}
                    className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                  >
                    Play Card
                  </button>
                )}
            </div>
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            <ScoreBoard
              scores={gameState.scores}
              targetScore={gameState.targetScore}
              winningBid={gameState.winningBid}
              biddingTeam={gameState.biddingTeam}
              currentRound={gameState.roundNumber}
            />

            {/* Player list */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Players</h3>
              <div className="space-y-2">
                {gameState.players.map((player) => (
                  <div
                    key={player.id}
                    className={`p-3 rounded-lg border ${
                      player.id === currentPlayer.id
                        ? "border-blue-500 bg-blue-50"
                        : player.id === activePlayer.id
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold">{player.name}</div>
                        <div className="text-xs text-gray-600">
                          Team {player.team} • {player.hand.length} cards
                        </div>
                      </div>
                      {player.id === activePlayer.id && (
                        <div className="text-xs font-semibold text-green-600">
                          Active
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
