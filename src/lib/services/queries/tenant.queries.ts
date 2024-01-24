import endpoints from '../endpoints';
import type { Builder } from '../type';

type Onboarding = { isOnboardingCompleted: boolean };

const fetchTenantOnboarding = (builder: Builder) =>
  builder.query<Onboarding, void>({
    query: () => endpoints.tenantOnboarding,
    providesTags: ['tenantOnboarding'],
  });

const updateTenantOnboarding = (builder: Builder) =>
  builder.mutation<Onboarding, Onboarding>({
    query: (onboarding) => ({
      url: endpoints.tenantOnboarding,
      method: 'PUT',
      body: JSON.stringify(onboarding),
    }),
    invalidatesTags: ['tenantOnboarding'],
  });

export const tenantQueries = (builder: Builder) => ({
  fetchTenantOnboarding: fetchTenantOnboarding(builder),
  updateTenantOnboarding: updateTenantOnboarding(builder),
});
