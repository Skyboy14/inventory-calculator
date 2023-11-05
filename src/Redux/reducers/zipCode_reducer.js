import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    zipCode: [], // Your list of items
};

const itemSlice = createSlice({
    name: 'zipCode',
    initialState,
    reducers: {
        getItemsSuccess: (state, action) => {
            state.zipCode = action.payload;
        },
        addItemSuccess: (state, action) => {
            state.zipCode.push(action.payload);
        },
        updateItemSuccess: (state, action) => {
            state.zipCode = action.payload
        },
    },
});

export const { getItemsSuccess, addItemSuccess, updateItemSuccess } = itemSlice.actions;
export default itemSlice.reducer;

