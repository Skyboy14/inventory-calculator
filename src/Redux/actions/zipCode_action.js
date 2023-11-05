// actions.js
import { createZipCode, fetchZipCode, updatezipCode } from '../apiServices/zipCodeService';
import { getItemsSuccess, addItemSuccess, updateItemSuccess } from '../reducers/parts_reducer';

// Assuming you have an API service or utility for making API calls



export const getZipCode = () => async (dispatch) => {
    try {
        const response = await fetchZipCode();
        const ZipCode = response.data;
        dispatch(getItemsSuccess(ZipCode));
    } catch (error) {
        // Handle the error
    }
};


export const addZipCode = (item) => async (dispatch) => {

    try {
        const response = await createZipCode(item);
        let len = response.data.length
        const newItem = response.data[len - 1];
        dispatch(addItemSuccess(newItem));
    } catch (error) {
        // Handle the error
    }
};

export const updateZipCode = (item) => async (dispatch) => {
    try {
        const response = await updatezipCode(item);
        const updatedZipCode = response.data;
        dispatch(updateItemSuccess(updatedZipCode));
    } catch (error) {
        // Handle the error
    }
};
