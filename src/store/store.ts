import { configureStore } from '@reduxjs/toolkit';
import { garageReducer } from './slices/garageSlice';
import { raceReducer } from './slices/raceSlice';
import { uiReducer } from './slices/uiSlice';
import { winnersReducer } from './slices/winnersSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    garage: garageReducer,
    winners: winnersReducer,
    race: raceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
