// actions.js
import { getItemsSuccess } from '../reducers/parts_reducer';

// Assuming you have an API service or utility for making API calls
import { fetchparts, createparts, updatepart } from '../apiServices/partServices';
import { mapPart } from '../apiServices/mapPartService';


export const getItems = () => async (dispatch) => {
    try {
        const response = await fetchparts();
        const parts = response.data;
        dispatch(getItemsSuccess(parts));
    } catch (error) {
        // Handle the error
    }
};