import { configureStore } from '@reduxjs/toolkit'
import huyaReducer from './views/huya/huyaSlice.js'

export default configureStore({
  reducer: {
    huya: huyaReducer,
  },
})
