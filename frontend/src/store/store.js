import { configureStore } from '@reduxjs/toolkit'
import AuthDataSlice from '../features/AuthDataSlice/AuthDataSlice'
import contentDataSlice from '../features/ContentDataSlice/ContentDataSlice'

const store = configureStore({
  reducer: {
    auth: AuthDataSlice,
    content:contentDataSlice
  },
})

export default store
