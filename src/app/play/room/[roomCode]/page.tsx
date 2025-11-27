"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter, useParams } from "next/navigation"
import { connectSocket, getSocket } from "@/lib/socket/client"
import { useGameStore } from "@/stores/useGameStore"
import { GameVariant, GamePhase, Suit, Card } from "@/types/game"
import GameBoard from "@/components/game/GameBoard"

export default function RoomPage() {
  const router = useRouter()
  const params = useParams()
  const roomCode = params.roomCode as string
  const { data: session, status } = useSession()
  const {
    currentRoom,
    setCurrentRoom,
    updateRoom,
    updateGameState,
    setConnected,
    setError,
    reset,
  } = useGameStore()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
      return
    }

    if (status === "authenticated" && session?.user) {
      const socket = connectSocket()

      socket.on("connect", () => {
        console.log("Connected to server")
        setConnected(true)

        // Join the room
        socket.emit("room:join", {
          roomCode,
          userId: session.user.id,
          username: session.user.name || "Player",
        })
      })

      socket.on("disconnect", () => {
        console.log("Disconnected from server")
        setConnected(false)
      })

      socket.on("room:joined", (room) => {
        setCurrentRoom(room)
      })

      socket.on("room:updated", (room) => {
        updateRoom(room)
      })

      socket.on("game:started", (gameState) => {
        updateGameState(gameState)
      })

      socket.on("game:updated", (gameState) => {
        updateGameState(gameState)
      })

      socket.on("error", ({ message }) => {
        setError(message)
      })

      return () => {
        // Leave room on unmount
        if (session?.user) {
          socket.emit("room:leave", {
            roomCode,
            userId: session.user.id,
          })
        }

        socket.off("connect")
        socket.off("disconnect")
        socket.off("room:joined")
        socket.off("room:updated")
        socket.off("game:started")
        socket.off("game:updated")
        socket.off("error")

        reset()
      }
    }
  }, [status, session, roomCode, router, setCurrentRoom, updateRoom, updateGameState, setConnected, setError, reset])

  const handleToggleReady = () => {
    if (!session?.user) return

    const socket = getSocket()
    socket.emit("player:ready", {
      roomCode,
      userId: session.user.id,
    })
  }

  const handleStartGame = () => {
    if (!session?.user) return

    const socket = getSocket()
    socket.emit("game:start", {
      roomCode,
      userId: session.user.id,
    })
  }

  const handleLeaveRoom = () => {
    if (!session?.user) return

    const socket = getSocket()
    socket.emit("room:leave", {
      roomCode,
      userId: session.user.id,
    })

    router.push("/play/lobby")
  }

  const handleBid = (amount: number | null) => {
    if (!session?.user) return

    const socket = getSocket()
    socket.emit("game:bid", {
      roomCode,
      userId: session.user.id,
      bidAmount: amount,
    })
  }

  const handleDeclareTrump = (suit: Suit) => {
    if (!session?.user) return

    const socket = getSocket()
    socket.emit("game:declareTrump", {
      roomCode,
      userId: session.user.id,
      trumpSuit: suit,
    })
  }

  const handlePlayCard = (card: Card) => {
    if (!session?.user) return

    const socket = getSocket()
    socket.emit("game:playCard", {
      roomCode,
      userId: session.user.id,
      card,
    })
  }

  if (status === "loading" || !currentRoom) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-gray-600">Loading room...</div>
      </div>
    )
  }

  const currentPlayer = currentRoom.players.find(
    (p) => p.userId === session?.user?.id
  )
  const isRoomCreator = currentRoom.createdBy === session?.user?.id
  const allPlayersReady = currentRoom.players.every((p) => p.isReady)
  const roomFull = currentRoom.players.length === currentRoom.maxPlayers

  // If game has started, show game board
  if (currentRoom.status === "in_progress" && currentRoom.gameState) {
    // Map userId to playerId format
    const playerIndex = currentRoom.players.findIndex(
      p => p.userId === session?.user?.id
    )
    const currentUserId = `player-${playerIndex}`

    return (
      <GameBoard
        gameState={currentRoom.gameState}
        currentUserId={currentUserId}
        onBid={handleBid}
        onDeclareTrump={handleDeclareTrump}
        onPlayCard={handlePlayCard}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Room Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Room: {currentRoom.roomCode}
            </h1>
            <p className="text-gray-600">
              {currentRoom.variant === GameVariant.FOUR_PLAYER
                ? "4-Player Game"
                : "6-Player Game"}{" "}
              ({currentRoom.players.length}/{currentRoom.maxPlayers} players)
            </p>
          </div>

          {/* Players List */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Players</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Team 1 */}
              <div className="border border-blue-300 rounded-lg p-4 bg-blue-50">
                <h3 className="font-semibold text-blue-900 mb-3">Team 1</h3>
                <div className="space-y-2">
                  {currentRoom.players
                    .filter((p) => p.team === 1)
                    .map((player, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center justify-between p-2 rounded ${
                          player.userId === session?.user?.id
                            ? "bg-blue-200"
                            : "bg-white"
                        }`}
                      >
                        <span className="font-medium">{player.username}</span>
                        <span
                          className={`text-sm px-2 py-1 rounded ${
                            player.isReady
                              ? "bg-green-200 text-green-800"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {player.isReady ? "Ready" : "Not Ready"}
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Team 2 */}
              <div className="border border-red-300 rounded-lg p-4 bg-red-50">
                <h3 className="font-semibold text-red-900 mb-3">Team 2</h3>
                <div className="space-y-2">
                  {currentRoom.players
                    .filter((p) => p.team === 2)
                    .map((player, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center justify-between p-2 rounded ${
                          player.userId === session?.user?.id
                            ? "bg-red-200"
                            : "bg-white"
                        }`}
                      >
                        <span className="font-medium">{player.username}</span>
                        <span
                          className={`text-sm px-2 py-1 rounded ${
                            player.isReady
                              ? "bg-green-200 text-green-800"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {player.isReady ? "Ready" : "Not Ready"}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            {!roomFull && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                <p className="text-yellow-800">
                  Waiting for more players... ({currentRoom.maxPlayers - currentRoom.players.length} needed)
                </p>
              </div>
            )}

            {roomFull && !allPlayersReady && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <p className="text-blue-800">
                  Waiting for all players to be ready...
                </p>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={handleToggleReady}
                className={`flex-1 py-3 px-4 font-semibold rounded-lg transition-colors ${
                  currentPlayer?.isReady
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                {currentPlayer?.isReady ? "Cancel Ready" : "Ready Up"}
              </button>

              {isRoomCreator && roomFull && allPlayersReady && (
                <button
                  onClick={handleStartGame}
                  className="flex-1 py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Start Game
                </button>
              )}

              <button
                onClick={handleLeaveRoom}
                className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
              >
                Leave Room
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
