import type { PayloadAction } from '@reduxjs/toolkit';
import { createSelector, createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../app/store';

export type AppEnvironment =
  | 'LOCAL'
  | 'DEVELOPMENT'
  | 'STAGING'
  | 'TESTING'
  | 'PRODUCTION';

export interface OriginState {
  isTest: boolean;
  environment: AppEnvironment;
}

const initialState: OriginState = {
  isTest: false,
  environment: 'PRODUCTION',
};

const originSlice = createSlice({
  name: 'origin',
  initialState,
  reducers: {
    setIsTest(state) {
      // eslint-disable-next-line no-param-reassign
      state.isTest = true;
    },
    setEnvironment(state, { payload }: PayloadAction<AppEnvironment>) {
      // eslint-disable-next-line no-param-reassign
      state.environment = payload;
    },
  },
});

export default originSlice.reducer;

export const { setIsTest, setEnvironment } = originSlice.actions;

const originSelector = (state: RootState) => state.origin;
export const isTestSelector = createSelector(
  originSelector,
  (state) => state.isTest
);
export const environmentSelector = createSelector(
  originSelector,
  (state) => state.environment
);
