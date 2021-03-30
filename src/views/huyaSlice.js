import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'huya',
  initialState: {
    liveRooms: [],
    y: 0,
  },
  reducers: {
    addRooms: (state, action) => {
      state.liveRooms.push(...action.payload)
    },
    setY: (state, action) => {
      state.y = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { addRooms, setY } = counterSlice.actions

export default counterSlice.reducer
