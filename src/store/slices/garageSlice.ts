import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Car } from '../../types/models';

export type GarageState = {
  cars: Car[];
  total: number;
  status: 'idle' | 'loading' | 'error';
};

const initialState: GarageState = {
  cars: [],
  total: 0,
  status: 'idle',
};

const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {
    garageLoading(state) {
      state.status = 'loading';
    },
    garageLoaded(state, action: PayloadAction<{ cars: Car[]; total: number }>) {
      state.cars = action.payload.cars;
      state.total = action.payload.total;
      state.status = 'idle';
    },
    garageFailed(state) {
      state.status = 'error';
    },
    patchCar(state, action: PayloadAction<Car>) {
      const next = action.payload;
      state.cars = state.cars.map((car) => (car.id === next.id ? next : car));
    },
    removeCarLocally(state, action: PayloadAction<number>) {
      const id = action.payload;
      state.cars = state.cars.filter((car) => car.id !== id);
      state.total = Math.max(0, state.total - 1);
    },
  },
});

export const { garageLoading, garageLoaded, garageFailed, patchCar, removeCarLocally } =
  garageSlice.actions;
export const garageReducer = garageSlice.reducer;
