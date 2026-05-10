import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { TRACK_END_PERCENT } from '../../constants/config';

export type CarMotionPhase = 'idle' | 'starting' | 'racing' | 'finished' | 'returning' | 'broken';

export type CarMotion = {
  phase: CarMotionPhase;
  durationMs: number;
  offsetPercent: number;
};

export type RaceState = {
  cars: Record<number, CarMotion>;
  pageRaceActive: boolean;
  banner: string | null;
};

const parked = (): CarMotion => ({
  phase: 'idle',
  durationMs: 0,
  offsetPercent: 0,
});

const initialState: RaceState = {
  cars: {},
  pageRaceActive: false,
  banner: null,
};

const raceSlice = createSlice({
  name: 'race',
  initialState,
  reducers: {
    setCarMotion(state, action: PayloadAction<{ id: number; motion: CarMotion }>) {
      const { id, motion } = action.payload;
      state.cars[id] = motion;
    },
    markCarStarting(state, action: PayloadAction<number>) {
      const id = action.payload;
      state.cars[id] = { phase: 'starting', durationMs: 0, offsetPercent: 0 };
    },
    markCarRacing(state, action: PayloadAction<{ id: number; durationMs: number }>) {
      const { id, durationMs } = action.payload;
      state.cars[id] = {
        phase: 'racing',
        durationMs,
        offsetPercent: TRACK_END_PERCENT,
      };
    },
    markCarFinished(state, action: PayloadAction<number>) {
      const id = action.payload;
      state.cars[id] = {
        phase: 'finished',
        durationMs: 0,
        offsetPercent: TRACK_END_PERCENT,
      };
    },
    markCarReturning(state, action: PayloadAction<{ id: number; durationMs: number }>) {
      const { id, durationMs } = action.payload;
      state.cars[id] = {
        phase: 'returning',
        durationMs,
        offsetPercent: 0,
      };
    },
    markCarIdle(state, action: PayloadAction<number>) {
      state.cars[action.payload] = parked();
    },
    markCarBroken(state, action: PayloadAction<number>) {
      state.cars[action.payload] = {
        phase: 'broken',
        durationMs: 0,
        offsetPercent: 0,
      };
    },
    setPageRaceActive(state, action: PayloadAction<boolean>) {
      state.pageRaceActive = action.payload;
    },
    setBanner(state, action: PayloadAction<string | null>) {
      state.banner = action.payload;
    },
    resetAllMotions(state, action: PayloadAction<number[]>) {
      action.payload.forEach((id) => {
        state.cars[id] = parked();
      });
      state.banner = null;
    },
  },
});

export const {
  setCarMotion,
  markCarStarting,
  markCarRacing,
  markCarFinished,
  markCarReturning,
  markCarIdle,
  markCarBroken,
  setPageRaceActive,
  setBanner,
  resetAllMotions,
} = raceSlice.actions;

export const raceReducer = raceSlice.reducer;
