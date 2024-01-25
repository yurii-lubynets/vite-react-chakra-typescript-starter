import {
  Alert,
  AlertTitle,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '~/lib/app/hooks';
import { selectedAppIdSelector, setSelectedAppId } from '~/lib/features/origin';
import {
  useLazyFetchAppOverviewQuery,
  useLazyFetchAppUsersQuery,
} from '~/lib/services/api';
import type { App } from '~/lib/services/queries/tenant.queries';

export const AppDrawer = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const dispatch = useAppDispatch();
  const selectedAppId = useAppSelector(selectedAppIdSelector);
  const [fetchAppOverview] = useLazyFetchAppOverviewQuery();
  const [fetchAppUsers] = useLazyFetchAppUsersQuery();
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

  const handleClose = useCallback(() => {
    dispatch(setSelectedAppId(undefined));
    onClose();
  }, [dispatch, onClose]);

  return (
    <Drawer placement="right" onClose={handleClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">App Ovewview</DrawerHeader>
        <DrawerBody>
          <Alert status="info">
            <Flex direction="column">
              <AlertTitle>App Name: {appOverview?.appName}</AlertTitle>
              <AlertTitle>Category: {appOverview?.category}</AlertTitle>
              <AlertTitle>Users: {appUsers.length}</AlertTitle>
              <AlertTitle>Connector: {appOverview?.appSources}</AlertTitle>
            </Flex>
          </Alert>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Username</Th>
                </Tr>
              </Thead>
              <Tbody>
                {appUsers.map((appUser) => (
                  <Tr key={appUser}>
                    <Td>{appUser}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
