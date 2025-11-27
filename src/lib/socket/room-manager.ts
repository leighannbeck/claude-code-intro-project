import { GameVariant, GameState, Suit } from "@/types/game"
import {
  createGame,
  startNewRound,
  processBid,
  declareTrump as gameDeclareTrump,
  playCard as gamePlayCard,
} from "@/game"

interface Player {
  userId: string
  username: string
  socketId: string
  isReady: boolean
  team: number
  position: number
}

interface Room {
  roomCode: string
  variant: GameVariant
  players: Player[]
  maxPlayers: number
  createdBy: string
  createdAt: Date
  gameState: GameState | null
  status: "waiting" | "in_progress" | "completed"
}

export class RoomManager {
  private rooms: Map<string, Room> = new Map()

  generateRoomCode(): string {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
    let code = ""
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return code
  }

  createRoom(variant: GameVariant, userId: string, username: string): Room {
    const roomCode = this.generateRoomCode()
    const maxPlayers = variant === GameVariant.FOUR_PLAYER ? 4 : 6

    const room: Room = {
      roomCode,
      variant,
      players: [
        {
          userId,
          username,
          socketId: "",
          isReady: false,
          team: 1,
          position: 0,
        },
      ],
      maxPlayers,
      createdBy: userId,
      createdAt: new Date(),
      gameState: null,
      status: "waiting",
    }

    this.rooms.set(roomCode, room)
    return room
  }

  joinRoom(roomCode: string, userId: string, username: string, socketId: string): Room {
    const room = this.rooms.get(roomCode)

    if (!room) {
      throw new Error("Room not found")
    }

    if (room.status !== "waiting") {
      throw new Error("Game already in progress")
    }

    if (room.players.length >= room.maxPlayers) {
      throw new Error("Room is full")
    }

    // Check if player already in room
    const existingPlayer = room.players.find(p => p.userId === userId)
    if (existingPlayer) {
      existingPlayer.socketId = socketId
      return room
    }

    // Assign team (alternating for 4-player, more complex for 6-player)
    const position = room.players.length
    let team: number

    if (room.variant === GameVariant.FOUR_PLAYER) {
      team = position % 2 === 0 ? 1 : 2
    } else {
      // 6-player: teams are 1,2,1,2,1,2
      team = position % 2 === 0 ? 1 : 2
    }

    room.players.push({
      userId,
      username,
      socketId,
      isReady: false,
      team,
      position,
    })

    return room
  }

  leaveRoom(roomCode: string, userId: string): Room | null {
    const room = this.rooms.get(roomCode)

    if (!room) {
      throw new Error("Room not found")
    }

    room.players = room.players.filter(p => p.userId !== userId)

    // Delete room if empty
    if (room.players.length === 0) {
      this.rooms.delete(roomCode)
      return null
    }

    // Reset ready status when someone leaves
    room.players.forEach(p => (p.isReady = false))

    return room
  }

  togglePlayerReady(roomCode: string, userId: string): Room {
    const room = this.rooms.get(roomCode)

    if (!room) {
      throw new Error("Room not found")
    }

    const player = room.players.find(p => p.userId === userId)
    if (!player) {
      throw new Error("Player not in room")
    }

    player.isReady = !player.isReady

    return room
  }

  startGame(roomCode: string, userId: string): GameState {
    const room = this.rooms.get(roomCode)

    if (!room) {
      throw new Error("Room not found")
    }

    if (room.createdBy !== userId) {
      throw new Error("Only room creator can start the game")
    }

    if (room.players.length !== room.maxPlayers) {
      throw new Error("Not enough players")
    }

    if (!room.players.every(p => p.isReady)) {
      throw new Error("Not all players are ready")
    }

    // Create game state
    const playerNames = room.players.map(p => p.username)
    const gameState = createGame(
      roomCode,
      room.variant,
      playerNames,
      500 // default target score
    )

    // Start first round
    const gameWithRound = startNewRound(gameState)

    room.gameState = gameWithRound
    room.status = "in_progress"

    return gameWithRound
  }

  processBid(roomCode: string, userId: string, bidAmount: number | null): GameState {
    const room = this.rooms.get(roomCode)

    if (!room || !room.gameState) {
      throw new Error("Game not found")
    }

    const playerIndex = room.players.findIndex(p => p.userId === userId)
    if (playerIndex === -1) {
      throw new Error("Player not in game")
    }

    const playerId = `player-${playerIndex}`
    const newGameState = processBid(room.gameState, playerId, bidAmount)

    room.gameState = newGameState
    return newGameState
  }

  declareTrump(roomCode: string, userId: string, trumpSuit: string): GameState {
    const room = this.rooms.get(roomCode)

    if (!room || !room.gameState) {
      throw new Error("Game not found")
    }

    const newGameState = gameDeclareTrump(room.gameState, trumpSuit as Suit)

    room.gameState = newGameState
    return newGameState
  }

  playCard(roomCode: string, userId: string, card: any): GameState {
    const room = this.rooms.get(roomCode)

    if (!room || !room.gameState) {
      throw new Error("Game not found")
    }

    const playerIndex = room.players.findIndex(p => p.userId === userId)
    if (playerIndex === -1) {
      throw new Error("Player not in game")
    }

    const playerId = `player-${playerIndex}`
    const newGameState = gamePlayCard(room.gameState, playerId, card)

    room.gameState = newGameState
    return newGameState
  }

  getActiveRooms(): Room[] {
    return Array.from(this.rooms.values()).filter(
      room => room.status === "waiting"
    )
  }

  handleDisconnect(socketId: string): Room[] {
    const affectedRooms: Room[] = []

    for (const room of this.rooms.values()) {
      const playerIndex = room.players.findIndex(p => p.socketId === socketId)

      if (playerIndex !== -1) {
        // Mark player as disconnected but don't remove them immediately
        room.players[playerIndex].socketId = ""

        // If game hasn't started, remove the player
        if (room.status === "waiting") {
          room.players.splice(playerIndex, 1)

          if (room.players.length === 0) {
            this.rooms.delete(room.roomCode)
          } else {
            affectedRooms.push(room)
          }
        } else {
          // In-progress game - handle reconnection later
          affectedRooms.push(room)
        }
      }
    }

    return affectedRooms
  }
}
