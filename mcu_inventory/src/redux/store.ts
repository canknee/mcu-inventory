import { configureStore } from '@reduxjs/toolkit'
import { configure } from '@testing-library/react'
import { reducer } from './slices/rootSlices'

export const store = configureStore({
    reducer,
    devTools: true
})