import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { appQueries } from './queries/app.queries';

const RESET_TIMEOUT_IN_SEC = 30 * 60 * 60; // 30 minutes in seconds

const API_URL = 'http://localhost:3000';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  keepUnusedDataFor: RESET_TIMEOUT_IN_SEC,
  refetchOnMountOrArgChange: RESET_TIMEOUT_IN_SEC,
  endpoints: (builder) => ({
    ...appQueries(builder),
  }),
});

export const { useFetchUsersQuery } = api;
