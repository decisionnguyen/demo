// @ts-ignore
import {createSlice, PayloadAction, Store} from '@reduxjs/toolkit'
import {combineReducers} from 'redux'
import {useSelector} from "react-redux";

const initialState: string[] = [];
const selectedCity = createSlice({
    name: 'selectedCity',
    initialState: initialState,
    reducers: {
        setSelected: (state: string[], action: {payload: string}) => {
            const oldList: string[] = [...state];
            const checkExists = oldList.indexOf(action.payload);
            if (checkExists > -1) {
                oldList.splice(checkExists, 1);
                return oldList
            }
            return [...new Set([...state, action.payload])]
        },
    }
});

export const constantReducer = combineReducers({
    selectedCity: selectedCity.reducer,
});

let _store: Store | undefined;

export const constantSetStore = (store: Store) => {
    _store = store;
};

export const setSelectedCityAction = (data: string) => {
    _store && _store.dispatch(selectedCity.actions.setSelected(data))
};


export const useSelectedCity = () => {
    //@ts-ignore
    return useSelector(state => state.constant.selectedCity || [])
};
