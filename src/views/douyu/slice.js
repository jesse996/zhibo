import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'douyu',
  initialState: {
    liveRooms: [],
    y: 0,
    total: 0, //总个数
  },
  reducers: {
    addRooms: (state, action) => {
      // state.liveRooms.push(...action.payload)
      let start = action.payload.start
      // console.log(action.payload)
      for (let i = 0; i < action.payload.list.length; i++) {
        state.liveRooms[start + i] = action.payload.list[i]
      }
    },
    setY: (state, action) => {
      state.y = action.payload
    },
    setTotal: (state, action) => {
      state.total = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { addRooms, setY, setTotal } = counterSlice.actions

export default counterSlice.reducer
