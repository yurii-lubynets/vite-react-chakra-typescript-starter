type ApiEndpoints = {
  getApps: '/api/v1/app-service/get-apps';
  getAppOverview: '/api/v1/app-service/get-app-overview/{appId}';
  getAppUsers: '/api/v1/app-service/get-app-overview-users/{appId}';
};

const endpoints: ApiEndpoints = {
  getApps: '/api/v1/app-service/get-apps',
  getAppOverview: '/api/v1/app-service/get-app-overview/{appId}',
  getAppUsers: '/api/v1/app-service/get-app-overview-users/{appId}',
};

export default endpoints;
