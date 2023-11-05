import { configureStore } from '@reduxjs/toolkit';
import parts_reducer from './reducers/parts_reducer';
import product_reducer from './reducers/product_reducer';
import zipCode_reducer from './reducers/zipCode_reducer';

// combine all reducers
const store = configureStore({
    reducer: {
        parts: parts_reducer,
        products: product_reducer,
        zipCode: zipCode_reducer,
    },
});


export default store;


