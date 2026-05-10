import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AppView, SortOrder, WinnerSortField } from '../../types/models';

export type UiState = {
  activeView: AppView;
  garagePage: number;
  winnersPage: number;
  createName: string;
  createColor: string;
  updateSelectedId: number | null;
  updateName: string;
  updateColor: string;
  winnersSort: WinnerSortField;
  winnersOrder: SortOrder;
};

const initialState: UiState = {
  activeView: 'garage',
  garagePage: 1,
  winnersPage: 1,
  createName: '',
  createColor: '#ffffff',
  updateSelectedId: null,
  updateName: '',
  updateColor: '#ffffff',
  winnersSort: 'wins',
  winnersOrder: 'DESC',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveView(state, action: PayloadAction<AppView>) {
      state.activeView = action.payload;
    },
    setGaragePage(state, action: PayloadAction<number>) {
      state.garagePage = Math.max(1, action.payload);
    },
    setWinnersPage(state, action: PayloadAction<number>) {
      state.winnersPage = Math.max(1, action.payload);
    },
    setCreateForm(state, action: PayloadAction<{ name: string; color: string }>) {
      state.createName = action.payload.name;
      state.createColor = action.payload.color;
    },
    setUpdateForm(
      state,
      action: PayloadAction<{ id: number | null; name: string; color: string }>,
    ) {
      state.updateSelectedId = action.payload.id;
      state.updateName = action.payload.name;
      state.updateColor = action.payload.color;
    },
    clearUpdateForm(state) {
      state.updateSelectedId = null;
      state.updateName = '';
      state.updateColor = '#ffffff';
    },
    setWinnersSort(state, action: PayloadAction<{ sort: WinnerSortField; order: SortOrder }>) {
      state.winnersSort = action.payload.sort;
      state.winnersOrder = action.payload.order;
    },
  },
});

export const {
  setActiveView,
  setGaragePage,
  setWinnersPage,
  setCreateForm,
  setUpdateForm,
  clearUpdateForm,
  setWinnersSort,
} = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
