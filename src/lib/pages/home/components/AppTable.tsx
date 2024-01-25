import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { PaginationTable } from 'table-pagination-chakra-ui';

import { useAppDispatch } from '~/lib/app/hooks';
import { setSelectedAppId } from '~/lib/features/origin';
import { useFetchAppsMutation } from '~/lib/services/api';
import type { App } from '~/lib/services/queries/tenant.queries';

import { AppDrawer } from './AppDrawer';

export const AppTable = () => {
  const dispatch = useAppDispatch();
  const [fetchApps, { data, isLoading, isError }] = useFetchAppsMutation();
  const [pageSize, setPageSize] = useState(25);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [tableData, setTableData] = useState<Array<App>>([]);

  useEffect(() => {
    const handle = async () => {
      await fetchApps({ pageSize: +pageSize, pageNumber });
    };
    handle();
  }, [fetchApps, pageNumber, pageSize]);

  useEffect(() => {
    if (!data) return;

    setTableData(data.appRows);
    setTotalItemsCount(data.totalCount);
  }, [data]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleRowClick = useCallback(
    (appId: string) => {
      dispatch(setSelectedAppId(appId));
      onOpen();
    },
    [dispatch, onOpen]
  );

  return (
    <>
      {isLoading && <Spinner />}
      {isError && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Your request was failed.</AlertTitle>
          <AlertDescription>Please try again</AlertDescription>
        </Alert>
      )}
      <Table variant="striped" size="sm">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Category</Th>
            <Th>Connector</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tableData.map((item) => {
            return (
              <Tr key={item.appId} onClick={() => handleRowClick(item.appId)}>
                <Td>{item.appName}</Td>
                <Td>{item.category}</Td>
                <Td>{item.appSources}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <PaginationTable
        pageSize={pageSize}
        setPageSize={setPageSize}
        pageIndex={pageNumber}
        setPageIndex={setPageNumber}
        totalItemsCount={totalItemsCount}
        pageSizeOptions={[25, 50]}
      />
      <AppDrawer isOpen={isOpen} onClose={onClose} />
    </>
  );
};
