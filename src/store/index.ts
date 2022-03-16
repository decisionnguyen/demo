import {applyMiddleware, combineReducers, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {composeWithDevTools} from 'redux-devtools-extension';
import {setStore} from './getStore';
import {constantReducer, constantSetStore} from "./constant";
import {cityReducer, setCityStore} from "./cities";

const middlewares: any[] = [];

if (__DEV__) {
    // middlewares.push(createDebugger());
}

const enhancer = composeWithDevTools(applyMiddleware(...middlewares));

const rootReducer = combineReducers({
    constant: constantReducer,
    cities: cityReducer
});

const persistedReducer = persistReducer(
    {
        key: 'root',
        whitelist: ['constant', 'cities', "videos"], // if you want to persist something, put it here
        storage: AsyncStorage,
    },
    rootReducer,
);

export const store = createStore(persistedReducer, enhancer);

export const persistor = persistStore(store);

export default store;

// set store
setStore(store);
constantSetStore(store);
setCityStore(store);
