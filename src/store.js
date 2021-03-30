import { configureStore } from '@reduxjs/toolkit'
import huyaReducer from './views/huyaSlice.js'

export default configureStore({
  reducer: {
    huya: huyaReducer,
  },
})
