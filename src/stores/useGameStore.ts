import { create } from "zustand"
import { GameState, GameVariant } from "@/types/game"

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

interface GameStore {
  // Room state
  currentRoom: Room | null
  availableRooms: Room[]

  // Connection state
  isConnected: boolean
  error: string | null

  // Actions
  setCurrentRoom: (room: Room | null) => void
  updateRoom: (room: Room) => void
  setAvailableRooms: (rooms: Room[]) => void
  setConnected: (connected: boolean) => void
  setError: (error: string | null) => void
  updateGameState: (gameState: GameState) => void
  clearError: () => void
  reset: () => void
}

export const useGameStore = create<GameStore>((set) => ({
  // Initial state
  currentRoom: null,
  availableRooms: [],
  isConnected: false,
  error: null,

  // Actions
  setCurrentRoom: (room) => set({ currentRoom: room }),

  updateRoom: (room) => set({ currentRoom: room }),

  setAvailableRooms: (rooms) => set({ availableRooms: rooms }),

  setConnected: (connected) => set({ isConnected: connected }),

  setError: (error) => set({ error }),

  updateGameState: (gameState) =>
    set((state) => ({
      currentRoom: state.currentRoom
        ? { ...state.currentRoom, gameState }
        : null,
    })),

  clearError: () => set({ error: null }),

  reset: () =>
    set({
      currentRoom: null,
      availableRooms: [],
      error: null,
    }),
}))
