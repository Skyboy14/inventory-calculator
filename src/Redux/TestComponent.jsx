// // components/SomeComponent.js
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getItems } from './actions/parts_action';

// const SomeComponent = () => {
//     const dispatch = useDispatch();
//     const data = useSelector((state) => state.parts.data);
//     const loading = useSelector((state) => state.parts.loading);
//     const error = useSelector((state) => state.parts.error);

//     console.log('data', data);
//     console.log('loading', loading);
//     console.log('error', error);

//     useEffect(() => {
//         dispatch(getItems());
//     }, [dispatch]);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     if (!data) {
//         return null; // Handle empty data case
//     }

//     return (
//         <div>

//         </div>
//     );
// };

// export default SomeComponent;
