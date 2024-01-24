import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { tenantQueries } from './queries/tenant.queries';
import { apiCacheTags } from './type';

const RESET_TIMEOUT_IN_SEC = 30 * 60 * 60; // 30 minutes in seconds

const API_URL = 'https://pokeapi.co/api/v2/';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: apiCacheTags,
  keepUnusedDataFor: RESET_TIMEOUT_IN_SEC,
  refetchOnMountOrArgChange: RESET_TIMEOUT_IN_SEC,
  endpoints: (builder) => ({
    ...tenantQueries(builder),
  }),
});

export const {
  useFetchTenantOnboardingQuery,
  useUpdateTenantOnboardingMutation,
} = api;
