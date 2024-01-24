import type {
  BaseQueryFn,
  EndpointBuilder,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';

export type BaseQueryType = BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  object,
  FetchBaseQueryMeta
>;

export const apiCacheTags = ['tenantOnboarding'] as const;
export type ApiCacheTag = (typeof apiCacheTags)[number];
export type Builder = EndpointBuilder<BaseQueryType, ApiCacheTag, 'api'>;
