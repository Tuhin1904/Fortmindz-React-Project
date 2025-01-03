import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './Slices';
import storage from 'redux-persist/lib/storage';
import {persistStore , persistReducer}  from 'redux-persist';

const persistConfig = {
    key:'root',
    storage,
    whitelist:[]
}

const  persistedReducer = persistReducer(persistConfig , rootReducer)

export const store = configureStore(
    {
        reducer: persistedReducer,
    }
)
export const persistor = persistStore(store);

// export default store