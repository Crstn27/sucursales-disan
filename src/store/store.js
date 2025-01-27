import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { uiSlice } from './ui'
import { branchesSlice } from './branches'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    branches: branchesSlice.reducer
  },
})