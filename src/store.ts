import { configureStore } from '@reduxjs/toolkit'
import huyaReducer from './views/huya/slice'
import douyuReducer from './views/douyu/slice'

const store = configureStore({
  reducer: {
    huya: huyaReducer,
    douyu: douyuReducer,
  },
})
export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
