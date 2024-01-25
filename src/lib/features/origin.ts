import { createSelector, createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../app/store';

export interface OriginState {
  selectedAppId: string | undefined;
}

const initialState: OriginState = {
  selectedAppId: undefined,
};

const originSlice = createSlice({
  name: 'origin',
  initialState,
  reducers: {
    setSelectedAppId(state, { payload }) {
      // eslint-disable-next-line no-param-reassign
      state.selectedAppId = payload;
    },
  },
});

export default originSlice.reducer;

export const { setSelectedAppId } = originSlice.actions;

const originSelector = (state: RootState) => state.origin;
export const selectedAppIdSelector = createSelector(
  originSelector,
  (state) => state.selectedAppId
);
