// actions.js
import axios from 'axios';

// Define an action type for success
export const POST_SUCCESS = 'POST_SUCCESS';

// Action creator for making a POST request
export const postItem = (itemData) => async (dispatch) => {
    try {
        // Make the POST request to your API
        const response = await axios.post('https://api.example.com/items', itemData);

        // Dispatch an action with the response data
        dispatch({
            type: POST_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        // Handle the error, e.g., dispatch an error action
        console.error('Error while making the POST request:', error);
    }
};
