import { configureStore } from '@reduxjs/toolkit'
import huyaReducer from './views/huya/huyaSlice.js'
import douyuReducer from './views/douyu/slice.js'

export default configureStore({
  reducer: {
    huya: huyaReducer,
    douyu: douyuReducer,
  },
})
