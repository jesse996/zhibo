import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import type { RootState } from '../../store'

interface DouyuState {
  liveRooms: any[]
  y: number
  total: number
}

interface RoomPayload {
  start: number
  list: any[]
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
    addRooms: (state, action: PayloadAction<RoomPayload>) => {
      // state.liveRooms.push(...action.payload)
      let start = action.payload.start
      // console.log(action.payload)
      for (let i = 0; i < action.payload.list.length; i++) {
        state.liveRooms[start + i] = action.payload.list[i]
      }
    },
    setY: (state, action: PayloadAction<number>) => {
      state.y = action.payload
    },
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { addRooms, setY, setTotal } = douyuSlice.actions

export default douyuSlice.reducer
