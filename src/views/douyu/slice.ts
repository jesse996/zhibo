import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import type { RootState } from '../../store'

interface DouyuState {
  liveRooms: any[]
  y: number
  total: number
}

const initialState: DouyuState = {
  liveRooms: [],
  y: 0,
  total: 0,
}

export const douyuSlice = createSlice({
  name: 'douyu',
  initialState,
  reducers: {
    addRooms: (state, action: PayloadAction<any>) => {
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
export const { addRooms, setY, setTotal } = douyuSlice.actions

export default douyuSlice.reducer
