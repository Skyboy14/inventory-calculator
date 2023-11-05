// actions.js
import { getItemsSuccess, addItemSuccess, updateItemSuccess, mapItemSuccess } from '../reducers/parts_reducer';

// Assuming you have an API service or utility for making API calls
import { fetchparts, createparts, updatepart } from '../apiServices/partServices';
import { mapPart } from '../apiServices/mapPartService';


export const getItems = () => async (dispatch) => {
    try {
        const response = await fetchparts();
        const parts = response.data.partEntity;
        dispatch(getItemsSuccess(parts));
    } catch (error) {
        // Handle the error
    }
};


export const addItem = (item) => async (dispatch) => {

    try {
        const response = await createparts(item);
        let len = response.data.partEntity.length
        const newItem = response.data.partEntity[len - 1];
        dispatch(addItemSuccess(newItem));
    } catch (error) {
        // Handle the error
    }
};

export const updateItem = (item) => async (dispatch) => {
    try {
        const response = await updatepart(item);
        const updatedItem = response.data.partEntity;
        dispatch(updateItemSuccess(updatedItem));
    } catch (error) {
        // Handle the error
    }
};

export const mapItem = (item) => async (dispatch) => {
    try {
        const response = await mapPart(item);
        const data = response.data;
        dispatch(mapItemSuccess(data))
    } catch (error) {
        // Handle the error
    }
};
