import { configureStore } from '@reduxjs/toolkit'
import dic from './dic'

export default configureStore({
  reducer: {
    dic,
  },
})