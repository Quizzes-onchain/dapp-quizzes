import { createSlice } from '@reduxjs/toolkit'
import { Socket } from 'socket.io-client'

type SocketState = {
  socket: Socket | null
}

const initialState: SocketState = {
  socket: null,
}

const socketReducer = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocket(state, action) {
      state.socket = action.payload
    },
  },
})

export type { SocketState }

export const { setSocket } = socketReducer.actions
export default socketReducer.reducer
