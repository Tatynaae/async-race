import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { WinnerTableRow } from '../../types/models';

export type WinnersState = {
  rows: WinnerTableRow[];
  total: number;
  status: 'idle' | 'loading' | 'error';
};

const initialState: WinnersState = {
  rows: [],
  total: 0,
  status: 'idle',
};

const winnersSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {
    winnersLoading(state) {
      state.status = 'loading';
    },
    winnersLoaded(state, action: PayloadAction<{ rows: WinnerTableRow[]; total: number }>) {
      state.rows = action.payload.rows;
      state.total = action.payload.total;
      state.status = 'idle';
    },
    winnersFailed(state) {
      state.status = 'error';
    },
  },
});

export const { winnersLoading, winnersLoaded, winnersFailed } = winnersSlice.actions;
export const winnersReducer = winnersSlice.reducer;
