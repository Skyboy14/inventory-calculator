// itemSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    category: [],
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
    },
});

export const { getItemsSuccess, addItemSuccess, updateItemSuccessli7 } = itemSlice.actions;
export default itemSlice.reducer;

