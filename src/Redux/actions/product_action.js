// actions.js
import { createproducts, fetchproducts, updateproduct } from "../apiServices/productService";
import { addItemSuccess, getItemsSuccess, updateItemSuccess } from "../reducers/product_reducer";

export const getProducts = () => async (dispatch) => {
    try {
        const response = await fetchproducts();
        const products = response.data;
        dispatch(getItemsSuccess(products));
    } catch (error) {
        // Handle the error
    }
};

export const addItem = (item) => async (dispatch) => {

    try {
        const response = await createproducts(item);
        let len = response.data.length
        const newItem = response.data[len - 1];
        dispatch(addItemSuccess(newItem));
    } catch (error) {
        // Handle the error
    }
};

export const updateItem = (item) => async (dispatch) => {
    try {
        const response = await updateproduct(item);
        const updatedItem = response.data;
        dispatch(updateItemSuccess(updatedItem));
    } catch (error) {
        // Handle the error
    }
};