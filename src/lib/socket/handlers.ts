import { Server as SocketIOServer, Socket } from "socket.io"
import { GameVariant } from "@/types/game"
import { RoomManager } from "./room-manager"

const roomManager = new RoomManager()

export function setupSocketHandlers(io: SocketIOServer) {
  io.on("connection", (socket: Socket) => {
    console.log(`Client connected: ${socket.id}`)

    // Room creation
    socket.on("room:create", ({ variant, userId, username }: {
      variant: GameVariant
      userId: string
      username: string
    }) => {
      try {
        const room = roomManager.createRoom(variant, userId, username)
        socket.join(room.roomCode)

        socket.emit("room:created", room)
        io.to(room.roomCode).emit("room:updated", room)

        console.log(`Room created: ${room.roomCode} by ${username}`)
      } catch (error) {
        socket.emit("error", { message: "Failed to create room" })
      }
    })

    // Join room
    socket.on("room:join", ({ roomCode, userId, username }: {
      roomCode: string
      userId: string
      username: string
    }) => {
      try {
        const room = roomManager.joinRoom(roomCode, userId, username, socket.id)
        socket.join(roomCode)

        socket.emit("room:joined", room)
        io.to(roomCode).emit("room:updated", room)

        console.log(`${username} joined room: ${roomCode}`)
      } catch (error: any) {
        socket.emit("error", { message: error.message || "Failed to join room" })
      }
    })

    // Leave room
    socket.on("room:leave", ({ roomCode, userId }: {
      roomCode: string
      userId: string
    }) => {
      try {
        const room = roomManager.leaveRoom(roomCode, userId)
        socket.leave(roomCode)

        if (room) {
          io.to(roomCode).emit("room:updated", room)
          console.log(`User ${userId} left room: ${roomCode}`)
        } else {
          // Room was deleted (empty)
          console.log(`Room ${roomCode} was deleted (empty)`)
        }
      } catch (error) {
        socket.emit("error", { message: "Failed to leave room" })
      }
    })

    // Player ready toggle
    socket.on("player:ready", ({ roomCode, userId }: {
      roomCode: string
      userId: string
    }) => {
      try {
        const room = roomManager.togglePlayerReady(roomCode, userId)
        io.to(roomCode).emit("room:updated", room)

        console.log(`Player ${userId} toggled ready in room: ${roomCode}`)
      } catch (error: any) {
        socket.emit("error", { message: error.message || "Failed to toggle ready" })
      }
    })

    // Start game
    socket.on("game:start", ({ roomCode, userId }: {
      roomCode: string
      userId: string
    }) => {
      try {
        const gameState = roomManager.startGame(roomCode, userId)
        io.to(roomCode).emit("game:started", gameState)

        console.log(`Game started in room: ${roomCode}`)
      } catch (error: any) {
        socket.emit("error", { message: error.message || "Failed to start game" })
      }
    })

    // Game actions
    socket.on("game:bid", ({ roomCode, userId, bidAmount }: {
      roomCode: string
      userId: string
      bidAmount: number | null
    }) => {
      try {
        const gameState = roomManager.processBid(roomCode, userId, bidAmount)
        io.to(roomCode).emit("game:updated", gameState)

        console.log(`Bid processed in room ${roomCode}: ${bidAmount ?? 'pass'}`)
      } catch (error: any) {
        socket.emit("error", { message: error.message || "Invalid bid" })
      }
    })

    socket.on("game:declareTrump", ({ roomCode, userId, trumpSuit }: {
      roomCode: string
      userId: string
      trumpSuit: string
    }) => {
      try {
        const gameState = roomManager.declareTrump(roomCode, userId, trumpSuit)
        io.to(roomCode).emit("game:updated", gameState)

        console.log(`Trump declared in room ${roomCode}: ${trumpSuit}`)
      } catch (error: any) {
        socket.emit("error", { message: error.message || "Failed to declare trump" })
      }
    })

    socket.on("game:playCard", ({ roomCode, userId, card }: {
      roomCode: string
      userId: string
      card: any
    }) => {
      try {
        const gameState = roomManager.playCard(roomCode, userId, card)
        io.to(roomCode).emit("game:updated", gameState)

        console.log(`Card played in room ${roomCode}`)
      } catch (error: any) {
        socket.emit("error", { message: error.message || "Invalid card play" })
      }
    })

    // Get active rooms
    socket.on("lobby:getRooms", () => {
      const rooms = roomManager.getActiveRooms()
      socket.emit("lobby:rooms", rooms)
    })

    // Disconnect
    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`)

      // Handle player disconnection from rooms
      const affectedRooms = roomManager.handleDisconnect(socket.id)

      affectedRooms.forEach(room => {
        io.to(room.roomCode).emit("room:updated", room)
      })
    })
  })
}
