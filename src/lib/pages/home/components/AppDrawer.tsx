import {
  Alert,
  AlertTitle,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useCallback } from 'react';

import { useAppDrawer } from '../hooks/useAppDrawer';

export const AppDrawer = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { makeClose, appOverview, appUsers, isFetching } = useAppDrawer();

  const handleClose = useCallback(() => {
    makeClose();
    onClose();
  }, [makeClose, onClose]);

  return (
    <Drawer placement="right" onClose={handleClose} isOpen={isOpen} size="lg">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">App Ovewview</DrawerHeader>
        {isFetching ? (
          <Spinner my={2} mx="auto" />
        ) : (
          <DrawerBody>
            <Alert status="info">
              <Flex direction="column">
                <AlertTitle>App Name: {appOverview?.appName}</AlertTitle>
                <AlertTitle>Category: {appOverview?.category}</AlertTitle>
                <AlertTitle>Users: {appUsers.length}</AlertTitle>
                <AlertTitle>Connector: {appOverview?.appSources}</AlertTitle>
              </Flex>
            </Alert>
            {Boolean(appUsers.length) && (
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
            )}
          </DrawerBody>
        )}
      </DrawerContent>
    </Drawer>
  );
};
