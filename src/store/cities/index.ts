import {createDynamicReducer} from '../../utils/createDynamicReducer';
import {RawCity} from './types';

export const {
  setStore,
  reducer,
  sync,
  useByKey,
  setQueries,
  useKeysByQuery,
} = createDynamicReducer<RawCity>('cities', 'id');

export const setCityStore = setStore;
export const cityReducer = reducer;
export const syncCity = sync;
export const useCity = useByKey;
export const syncCitysByQueries = setQueries;
export const useCityByQuery = useKeysByQuery;

