import { createAsyncThunk } from '@reduxjs/toolkit'
import { userServices } from '../services/user.service'

export const fetchBalance = createAsyncThunk('user/fetchBalance', async (data: string, { rejectWithValue }) => {
  try {
    const _data = await userServices.fetchBalance(data)
    return _data
  } catch (error) {
    return rejectWithValue(error)
  }
})
