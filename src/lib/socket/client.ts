"use client"

import { io, Socket } from "socket.io-client"

let socket: Socket | null = null

export function getSocket(): Socket {
  if (!socket) {
    socket = io({
      path: "/socket.io",
      autoConnect: false,
    })
  }

  return socket
}

export function connectSocket(): Socket {
  const socket = getSocket()

  if (!socket.connected) {
    socket.connect()
  }

  return socket
}

export function disconnectSocket(): void {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}
