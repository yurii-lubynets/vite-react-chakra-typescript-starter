import { combineReducers, configureStore } from '@reduxjs/toolkit';

import originReducer from '../features/origin';
import { api } from '../services/api';

// Create the root reducer independently to obtain the RootState type
const rootReducer = combineReducers({
  origin: originReducer,
  [api.reducerPath]: api.reducer,
});

const setupStore = (preloadedState?: RootState) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware),
    preloadedState,
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
