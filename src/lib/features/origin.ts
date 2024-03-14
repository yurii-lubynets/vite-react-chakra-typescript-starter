import { createSelector, createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../app/store';

export interface OriginState {}

const initialState: OriginState = {};

const originSlice = createSlice({
  name: 'origin',
  initialState,
  reducers: {
    setSelectedAppId() {},
  },
});

export default originSlice.reducer;

export const { setSelectedAppId } = originSlice.actions;

const originSelector = (state: RootState) => state.origin;
export const isTestSelector = createSelector(originSelector, (state) => state);
