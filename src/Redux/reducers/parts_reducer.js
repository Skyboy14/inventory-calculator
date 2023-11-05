// itemSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    parts: [],
    mapping: [],// Your list of items
};

const itemSlice = createSlice({
    name: 'parts',
    initialState,
    reducers: {
        getItemsSuccess: (state, action) => {
            state.parts = action.payload;
        },
        addItemSuccess: (state, action) => {
            state.parts.push(action.payload);
        },
        updateItemSuccess: (state, action) => {
            state.parts = action.payload
        },
        mapItemSuccess: (state, action) => {
            state.mapping = action.payload
        },
    },
});

export const { getItemsSuccess, addItemSuccess, updateItemSuccess, mapItemSuccess } = itemSlice.actions;
export default itemSlice.reducer;

