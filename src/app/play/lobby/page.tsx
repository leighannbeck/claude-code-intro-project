"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { connectSocket, getSocket } from "@/lib/socket/client"
import { useGameStore } from "@/stores/useGameStore"
import { GameVariant } from "@/types/game"

export default function LobbyPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const {
    availableRooms,
    setAvailableRooms,
    setCurrentRoom,
    setConnected,
    setError,
    clearError,
  } = useGameStore()

  const [selectedVariant, setSelectedVariant] = useState<GameVariant>(
    GameVariant.FOUR_PLAYER
  )
  const [isCreating, setIsCreating] = useState(false)
  const [joinCode, setJoinCode] = useState("")

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
      return
    }

    if (status === "authenticated") {
      const socket = connectSocket()

      socket.on("connect", () => {
        console.log("Connected to server")
        setConnected(true)
        socket.emit("lobby:getRooms")
      })

      socket.on("disconnect", () => {
        console.log("Disconnected from server")
        setConnected(false)
      })

      socket.on("lobby:rooms", (rooms) => {
        setAvailableRooms(rooms)
      })

      socket.on("room:created", (room) => {
        setCurrentRoom(room)
        router.push(`/play/room/${room.roomCode}`)
      })

      socket.on("room:joined", (room) => {
        setCurrentRoom(room)
        router.push(`/play/room/${room.roomCode}`)
      })

      socket.on("error", ({ message }) => {
        setError(message)
        setIsCreating(false)
      })

      // Refresh room list every 5 seconds
      const interval = setInterval(() => {
        socket.emit("lobby:getRooms")
      }, 5000)

      return () => {
        clearInterval(interval)
        socket.off("connect")
        socket.off("disconnect")
        socket.off("lobby:rooms")
        socket.off("room:created")
        socket.off("room:joined")
        socket.off("error")
      }
    }
  }, [status, router, setAvailableRooms, setCurrentRoom, setConnected, setError])

  const handleCreateRoom = () => {
    if (!session?.user) return

    setIsCreating(true)
    clearError()

    const socket = getSocket()
    socket.emit("room:create", {
      variant: selectedVariant,
      userId: session.user.id,
      username: session.user.name || "Player",
    })
  }

  const handleJoinRoom = (roomCode: string) => {
    if (!session?.user) return

    clearError()

    const socket = getSocket()
    socket.emit("room:join", {
      roomCode,
      userId: session.user.id,
      username: session.user.name || "Player",
    })
  }

  const handleJoinByCode = () => {
    if (!joinCode.trim() || !session?.user) return

    handleJoinRoom(joinCode.toUpperCase())
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center">
        <div className="text-gray-900 text-2xl font-bold">♠ Loading... ♥</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F2F2F2] py-12 px-4 sm:px-6 lg:px-8">
      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,currentColor_10px,currentColor_20px)]"></div>

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-3 drop-shadow-lg">
            ♠ ♥ Game Lobby ♦ ♣
          </h1>
          <p className="text-gray-900 text-xl font-semibold drop-shadow">Create a new room or join an existing game</p>
        </div>

        {/* Create Room Section */}
        <div className="bg-white rounded-xl shadow-2xl p-8 mb-8 border-8 border-[#BF1736] relative">
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#243CBF] rounded-tl-xl"></div>
          <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-[#BF1736] rounded-tr-xl"></div>
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-[#BF1736] rounded-bl-xl"></div>
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#243CBF] rounded-br-xl"></div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center border-b-4 border-[#BF1736] pb-3">
            ♥ Create New Room ♠
          </h2>

          <div className="mb-6">
            <label className="block text-lg font-bold text-gray-900 mb-4 text-center">
              Game Variant
            </label>
            <div className="flex gap-6">
              <button
                onClick={() => setSelectedVariant(GameVariant.FOUR_PLAYER)}
                className={`flex-1 py-5 px-6 rounded-lg border-4 transition-all shadow-lg ${
                  selectedVariant === GameVariant.FOUR_PLAYER
                    ? "border-[#243CBF] bg-blue-100 text-blue-900"
                    : "border-gray-400 bg-gray-50 hover:border-[#243CBF]"
                }`}
              >
                <div className="font-bold text-xl mb-1">♠ 4-Player ♥</div>
                <div className="text-sm font-medium text-gray-900">Teams: 2v2</div>
              </button>

              <button
                onClick={() => setSelectedVariant(GameVariant.SIX_PLAYER)}
                className={`flex-1 py-5 px-6 rounded-lg border-4 transition-all shadow-lg ${
                  selectedVariant === GameVariant.SIX_PLAYER
                    ? "border-[#A67D4B] bg-orange-100 text-orange-900"
                    : "border-gray-400 bg-gray-50 hover:border-[#A67D4B]"
                }`}
              >
                <div className="font-bold text-xl mb-1">♣ 6-Player ♦</div>
                <div className="text-sm font-medium text-gray-900">Teams: 3 teams of 2</div>
              </button>
            </div>
          </div>

          <button
            onClick={handleCreateRoom}
            disabled={isCreating}
            className="w-full py-4 px-6 bg-[#BF1736] hover:bg-[#2944D9] text-white text-xl font-bold rounded-lg border-4 border-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all shadow-2xl"
          >
            {isCreating ? "♦ Creating Room... ♣" : "♥ Create Room ♠"}
          </button>
        </div>

        {/* Join by Code Section */}
        <div className="bg-white rounded-xl shadow-2xl p-8 mb-8 border-8 border-[#243CBF] relative">
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#BF1736] rounded-tl-xl"></div>
          <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-[#243CBF] rounded-tr-xl"></div>
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-[#243CBF] rounded-bl-xl"></div>
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#BF1736] rounded-br-xl"></div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center border-b-4 border-[#243CBF] pb-3">
            ♦ Join by Room Code ♣
          </h2>

          <div className="flex gap-4">
            <input
              type="text"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              placeholder="Enter room code (e.g., ABC123)"
              maxLength={6}
              className="flex-1 px-6 py-4 border-4 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#243CBF] focus:border-[#243CBF] uppercase text-lg font-bold shadow-lg"
            />
            <button
              onClick={handleJoinByCode}
              disabled={!joinCode.trim()}
              className="px-8 py-4 bg-[#243CBF] hover:bg-[#2944D9] text-white text-xl font-bold rounded-lg border-4 border-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all shadow-2xl"
            >
              ♠ Join
            </button>
          </div>
        </div>

        {/* Available Rooms Section */}
        <div className="bg-white rounded-xl shadow-2xl p-8 border-8 border-[#A67D4B] relative">
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#243CBF] rounded-tl-xl"></div>
          <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-[#BF1736] rounded-tr-xl"></div>
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-[#BF1736] rounded-bl-xl"></div>
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#243CBF] rounded-br-xl"></div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center border-b-4 border-[#A67D4B] pb-3">
            ♣ Available Rooms ♥
          </h2>

          {availableRooms.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-900 text-xl font-bold mb-2">No rooms available</p>
              <p className="text-gray-700 font-medium">Create one to get started!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableRooms.map((room) => (
                <div
                  key={room.roomCode}
                  className="border-4 border-gray-400 hover:border-[#243CBF] rounded-lg p-6 bg-gray-50 transition-all shadow-lg hover:shadow-2xl"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="font-bold text-2xl text-[#243CBF]">♠ {room.roomCode}</div>
                      <div className="text-sm font-bold text-gray-900 mt-1">
                        {room.variant === GameVariant.FOUR_PLAYER
                          ? "4-Player"
                          : "6-Player"}
                      </div>
                    </div>
                    <div className="text-lg font-bold text-[#BF1736] bg-red-100 px-3 py-1 rounded border-2 border-[#BF1736]">
                      {room.players.length}/{room.maxPlayers}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm font-bold text-gray-900 mb-2">Players:</div>
                    <div className="space-y-2">
                      {room.players.map((player, idx) => (
                        <div key={idx} className="text-sm font-medium flex items-center gap-2 bg-white px-3 py-2 rounded border-2 border-gray-300">
                          <span className={`w-3 h-3 rounded-full ${
                            player.team === 1 ? "bg-[#243CBF]" : player.team === 2 ? "bg-[#BF1736]" : "bg-[#A67D4B]"
                          }`}></span>
                          {player.username}
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleJoinRoom(room.roomCode)}
                    disabled={room.players.length >= room.maxPlayers}
                    className="w-full py-3 px-4 bg-[#243CBF] hover:bg-[#2944D9] text-white font-bold rounded-lg border-4 border-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all shadow-lg"
                  >
                    {room.players.length >= room.maxPlayers
                      ? "Room Full"
                      : "♥ Join Room ♦"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
