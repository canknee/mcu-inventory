import { createSlice } from '@reduxjs/toolkit'

const rootSlice =  createSlice({
    name: 'root',
    initialState: {
        name: 'Spooderman',
        comics_appeared_in: '1',
        date_created: 'Jan 1, 1400',
        description: 'Friendly neighborhood spooderman',
        super_power: 'sticky',
    },
    reducers: {
        chooseName: (state, action) => { state.name = action.payload },
        chooseComic: (state, action) => { state.comics_appeared_in = action.payload }
    }
})


//export reducer
export const reducer = rootSlice.reducer;
export const { chooseName, chooseComic } = rootSlice.actions

