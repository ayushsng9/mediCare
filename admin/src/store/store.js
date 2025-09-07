import {configureStore} from '@reduxjs/toolkit';
import adminSlice from './adminSlice';
import doctorSlice from './doctorSlice'
import appSlice from './appSlice'

const store = configureStore({
    reducer: {
        admin : adminSlice,
        app : appSlice,
        doctor : doctorSlice
    }
});


export default store;