import endpoints from '../endpoints';
import type { Builder } from '../type';

export type App = {
  appId: string;
  appName: string;
  appSources: Array<string>;
  category: string;
};

type AppsResponse = {
  data: {
    appRows: Array<App>;
    totalCount: number;
  };
};

const fetchApps = (builder: Builder) =>
  builder.mutation<
    AppsResponse,
    {
      pageNumber: number;
      pageSize: number;
    }
  >({
    query: (params) => ({
      url: endpoints.getApps,
      method: 'PUT',
      body: params,
    }),
  });

type AppResponse = {
  appOverview: App;
};

const fetchAppOverview = (builder: Builder) =>
  builder.query<AppResponse, string>({
    query: (appId) => `${endpoints.getAppOverview}/${appId}`,
  });

type AppUsersResponse = {
  appUsers: Array<string>;
};

const fetchAppUsers = (builder: Builder) =>
  builder.query<AppUsersResponse, string>({
    query: (appId) => `${endpoints.getAppUsers}/${appId}`,
  });

export const tenantQueries = (builder: Builder) => ({
  fetchApps: fetchApps(builder),
  fetchAppOverview: fetchAppOverview(builder),
  fetchAppUsers: fetchAppUsers(builder),
});
