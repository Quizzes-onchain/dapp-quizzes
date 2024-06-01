import { createSlice } from '@reduxjs/toolkit'
import { fetchBalance } from '../actions/user.action'

const initialState = {
  address: '',
  role: '',
  balance: 0,
}

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload
    },
  },
  extraReducers: (builder) =>
    builder.addCase(fetchBalance.fulfilled, (state, action) => {
      state.balance = action.payload
    }),
})

export default user.reducer

export const { setRole } = user.actions
