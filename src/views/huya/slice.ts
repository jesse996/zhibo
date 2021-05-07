import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import type { RootState } from '../../store'

export interface ResponseHuyaRoom {
  gameFullName: string
  gameHostName: string
  gid: string
  introduction: string
  liveSourceType: string
  nick: string
  privateHost: string
  profileRoom: string
  screenType: string
  screenshot: string
  totalCount: string
  uid: string
}

export interface ResponseHuyaUrl {
  live: boolean
  url: string
}

interface HuyaState {
  liveRooms: ResponseHuyaRoom[]
  y: number
  total: number
}

interface RoomPayload {
  start: number
  list: ResponseHuyaRoom[]
}

const initialState: HuyaState = {
  liveRooms: [],
  y: 0,
  total: 0,
}

export const huyaSlice = createSlice({
  name: 'huya',
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
export const { addRooms, setY, setTotal } = huyaSlice.actions

export default huyaSlice.reducer
