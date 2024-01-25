import { useCallback, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '~/lib/app/hooks';
import { selectedAppIdSelector, setSelectedAppId } from '~/lib/features/origin';
import {
  useLazyFetchAppOverviewQuery,
  useLazyFetchAppUsersQuery,
} from '~/lib/services/api';
import type { App } from '~/lib/services/queries/app.queries';

type UseAppDrawer = {
  makeClose: () => void;
  appOverview: App | undefined;
  appUsers: Array<string>;
  isFetching: boolean;
};

export const useAppDrawer = (): UseAppDrawer => {
  const dispatch = useAppDispatch();
  const selectedAppId = useAppSelector(selectedAppIdSelector);
  const [fetchAppOverview, { isFetching: isAppOverviewFetching }] =
    useLazyFetchAppOverviewQuery();
  const [fetchAppUsers, { isFetching: isAppUsersFetching }] =
    useLazyFetchAppUsersQuery();

  const [appOverview, setAppOVerview] = useState<App>();
  const [appUsers, setAppUsers] = useState<Array<string>>([]);

  useEffect(() => {
    if (!selectedAppId) return;
    const handle = async () => {
      const { data } = await fetchAppOverview(selectedAppId);
      setAppOVerview(data?.appOverview);
    };
    handle();
  }, [selectedAppId, fetchAppOverview]);

  useEffect(() => {
    if (!selectedAppId) return;
    const handle = async () => {
      const { data } = await fetchAppUsers(selectedAppId);
      setAppUsers(data?.appUsers ?? []);
    };
    handle();
  }, [selectedAppId, fetchAppUsers]);

  const makeClose = useCallback(
    () => dispatch(setSelectedAppId(undefined)),
    [dispatch]
  );

  return {
    appUsers,
    appOverview,
    makeClose,
    isFetching: isAppOverviewFetching || isAppUsersFetching,
  };
};
