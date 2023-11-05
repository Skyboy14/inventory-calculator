import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [], // Your list of items
};

const itemSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        getItemsSuccess: (state, action) => {
            state.products = action.payload;
        },
        addItemSuccess: (state, action) => {
            state.products.push(action.payload);
        },
        updateItemSuccess: (state, action) => {
            state.products = action.payload
        },
    },
});

export const { getItemsSuccess, addItemSuccess, updateItemSuccess } = itemSlice.actions;
export default itemSlice.reducer;

